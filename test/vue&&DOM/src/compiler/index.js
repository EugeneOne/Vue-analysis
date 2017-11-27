import Watcher from '../watcher'

const updater = {
    modelUpdater(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    textUpdater: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    htmlUpdater: function (node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function (node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },
}
// 指令处理集合
const compileUtil = {
    // exp: 指令value
    text: function (node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    html: function (node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    model(node, vm, exp) {
        this.bind(node, vm, exp, 'model');
        let self = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', (e) => {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self._setVMVal(vm, exp, newValue);
            val = newValue;
        })
    },

    bind(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater']

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        new Watcher(vm, exp, (value, oldValue) => {
            updaterFn && updaterFn(node, value, oldValue);
        })
    },

    eventHandler(node, vm, exp, dir) {
        const eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];
        
        if(eventType && fn) {
            // 将methods中的this指向vm
            node.addEventListener(eventType, fn.bind(vm), false)
        }
    },

    _getVMVal(vm, exp) {
        let val = vm;
        exp = exp.split('.');
        exp.forEach((i) => {
            val = val[i]
        })

        return val;
    },
    _setVMVal(vm, exp, newValue) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach((value, index) => {
            if(index < exp.length -1) {
                val = val[value];
            } else {
                val[value] = newValue;
            }
        })
    }
}

class Compile {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = this.isElementNode(el)? el: document.querySelector(el)
        if(this.$el) {
            this.$fragment = this.node2Fragment(this.$el);
            this.init();
            // 将变化的dom替换原dom
            this.$el.appendChild(this.$fragment)
        }
    }

    node2Fragment(el) {
        // 创建节点碎片
        var fragment = document.createDocumentFragment(),
            child;
        // 添加el的子节点
        while( child = el.firstChild ) {
            fragment.appendChild(child)
        }

        return fragment;
    }
    init() {
        this.compileElement(this.$fragment)
    }

    compileElement(el) {
        //childNodes 属性返回节点的子节点集合，以 NodeList 对象
        // childNodes属性返回的数组中包含着所有类型的节点，所有的属性节点和文本节点也包含在其中
        var childNodes = el.childNodes,
            self = this;
        // 将具有length属性的对象转换成数组
        [].slice.call(childNodes).forEach((node) => {
            // 获得元素的文本内容
            let text = node.textContent;
            console.log("textContent:", node, text,self.isElementNode(node))
            let reg = /\{\{(.*)\}\}/;
            
            if(self.isElementNode(node)) {
                self.compile(node)
            } else if(self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        })
    }

    compile(node) {
        // 获取节点所有属性
        // 例如： id="test"
        var nodeAttrs = node.attributes,
            self = this;
        [].slice.call(nodeAttrs).forEach((attr) => {
            // 获取属性名
            // 例如 id
            var attrName = attr.name;
            // 判断是否是绑定指令
            if(self.isDirective(attrName)) {
                // 获取属性值
                // 例如 test
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if(self.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, self.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, self.$vm, exp);
                }
            }
        })
    }
    compileText(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    }
    isDirective(attr) {
        return attr.indexOf('v-') == 0
    }
    isEventDirective(dir) {
        return dir.indexOf('on') === 0;
    }
    isTextNode(node) {
        return node.nodeType == 3;
    }
    isElementNode(node) {
        // nodeType: 
        // 元素节点：1
        //属性节点：2
        //文本节点：3
        //注释节点：8
        return node.nodeType == 1;
    }
}

export default Compile