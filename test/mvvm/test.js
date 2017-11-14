var data = { name: 'eugene' };
observer(data);
data.name = 'wyq';

function observer(data) {
    if(!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach((key) => {
        
        defineReactive(data, key, data[key])
    })
}

function defineReactive(data, key, val) {
    var dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true, //可枚举
        configurable: false, // 不能再define
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        get: () => {
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        // 赋新值时监听变化
        set: (newVal) => {
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
            dep.notify();
        } 
    })
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: (sub) => {
        this.subs.push(sub);
    },
    notify: function (){
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

Watcher.prototype = {
    get: function(key) {
        Dep.target = this;
        this.value = date[key];
        Dep.target = null;
    }
}

// Compile.js
function Compile(el) {
    // 判断el是否是dom元素
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if(this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.addpendChild(this.$fragment);
    }
}

Compile.prototype = {
    init: () => {
        this.comileElement(this.$fragment)
    },
    nonde2Fragment: (el) => {
        var fragment = document.createDocumentFragment(),
            child;
        // firstChild 返回文档的首个子节点
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    // compileElement方法将遍历所有节点及其子节点，进行扫描解析编译，调用对应的指令渲染函数进行数据渲染，并调用对应的指令更新函数进行绑定
    compileElement: (el) => {
        var childNodes = el.childNodes,
            me = this;
        [].splice.call(childNodes).forEach((node) => {
            var text = node.textContent;
            var reg = /\{(.*)\}\}/;  // 表达式文本
            // 按元素节点方式编译
            if(me.isElementNode(node)) {
                me.compile(node);
            } else if(me.isTextNode(node) && reg.test(text)){
                me.compileText(node, RegExg.$1)
            }
            // 遍历子节点
            if(node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        })
    },
    compile: (node) => {
        var nodeAttrs = node.attributes, me = this;
        [].slice.call(nodeAttrs).forEach((attr) => {
            // 规定：指令以 v-xxx 命名
            // 如 <span v-text="content"></span> 中指令为 v-text
            var attrName = attr.name; // v-text
            if(me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2); // text
                if(me.isEventDirective(dir)) {
                    // 事件指令, 如 v-on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    // 普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
            }
        })
    }
}