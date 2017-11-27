/*!
 * vue-test v1.0.0
 * (c) 2017-2017 wyq
 * Released under the ISC License.
 * 
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vues = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var uid = 0;

var Dep = function () {
    function Dep() {
        classCallCheck(this, Dep);

        this.id = uid++;
        this.subs = [];
    }

    createClass(Dep, [{
        key: "notify",
        value: function notify() {
            this.subs.forEach(function (sub) {
                sub.update();
            });
        }
    }, {
        key: "addSub",
        value: function addSub(value) {
            this.subs.push(value);
        }
    }, {
        key: "depend",
        value: function depend() {
            console.log("depend");
            Dep.target.addDep(this);
        }
    }]);
    return Dep;
}();

Dep.target = null;

var Observe = function () {
    function Observe(val) {
        classCallCheck(this, Observe);

        this.data = val;
        this.walk(val);
    }

    createClass(Observe, [{
        key: 'walk',
        value: function walk(val) {
            var _this = this;

            Object.keys(val).forEach(function (key) {
                _this.defineReactive(_this.data, key, val[key]);
            });
        }
    }, {
        key: 'convert',
        value: function convert(key, val) {
            this.defineReactive(this.data, key, val);
        }
    }, {
        key: 'defineReactive',
        value: function defineReactive(data, key, val) {
            console.log("defineReactive", data, key, val);
            var dep = new Dep();
            var childObj = observe(val);

            Object.defineProperty(data, key, {
                configurable: false,
                enumerable: true,
                get: function get$$1() {
                    if (Dep.target) {
                        dep.depend();
                    }
                    return val;
                },
                set: function set$$1(newVal) {
                    if (newVal === val) {
                        return;
                    }
                    console.log(newVal);
                    val = newVal;
                    // 新的值是object的话，进行监听
                    childObj = observe(newVal);
                    // 通知订阅者
                    dep.notify();
                }
            });
        }
    }]);
    return Observe;
}();

function observe(val) {
    if (!val || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object') {
        return;
    }
    console.log(val);
    return new Observe(val);
}

var Watcher = function () {
    function Watcher(vm, expOrFn, cb) {
        classCallCheck(this, Watcher);

        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.depIds = {};
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = this.parseGetter(expOrFn);
        }
        this.value = this.get();
    }

    createClass(Watcher, [{
        key: 'get',
        value: function get$$1() {
            Dep.target = this;
            var value = this.getter.call(this.vm, this.vm);
            Dep.target = null;
            return value;
        }
    }, {
        key: 'addDep',
        value: function addDep(dep) {
            // 1. 每次调用run()的时候会触发相应属性的getter
            // getter里面会触发dep.depend()，继而触发这里的addDep
            // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
            // 则不需要将当前watcher添加到该属性的dep里
            // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
            // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
            // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
            // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
            // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
            // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
            // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
            // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
            // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
            // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
            if (!this.depIds.hasOwnProperty(dep.id)) {
                dep.addSub(this);
                this.depIds[dep.id] = dep;
            }
        }
    }, {
        key: 'update',
        value: function update() {
            this.run();
        }
    }, {
        key: 'run',
        value: function run() {
            var value = this.get();
            var oldValue = this.value;
            if (value != oldValue) {
                this.value = value;
                this.cb.call(this.vm, value, oldValue);
            }
        }
    }, {
        key: 'parseGetter',
        value: function parseGetter(exp) {
            if (/[^\w.$]/.test(exp)) return;

            var exps = exp.split('.');

            return function (obj) {
                exps.forEach(function (i) {
                    if (!obj) return;
                    obj = obj[i];
                });
                return obj;
            };
        }
    }]);
    return Watcher;
}();

var updater = {
    modelUpdater: function modelUpdater(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    },

    textUpdater: function textUpdater(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    htmlUpdater: function htmlUpdater(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function classUpdater(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    }
    // 指令处理集合
};var compileUtil = {
    // exp: 指令value
    text: function text(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    html: function html(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    model: function model(node, vm, exp) {
        this.bind(node, vm, exp, 'model');
        var self = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    bind: function bind(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        new Watcher(vm, exp, function (value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    eventHandler: function eventHandler(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            // 将methods中的this指向vm
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    _getVMVal: function _getVMVal(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (i) {
            val = val[i];
        });

        return val;
    },
    _setVMVal: function _setVMVal(vm, exp, newValue) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (value, index) {
            if (index < exp.length - 1) {
                val = val[value];
            } else {
                val[value] = newValue;
            }
        });
    }
};

var Compile = function () {
    function Compile(el, vm) {
        classCallCheck(this, Compile);

        this.$vm = vm;
        this.$el = this.isElementNode(el) ? el : document.querySelector(el);
        if (this.$el) {
            this.$fragment = this.node2Fragment(this.$el);
            this.init();
            // 将变化的dom替换原dom
            this.$el.appendChild(this.$fragment);
        }
    }

    createClass(Compile, [{
        key: 'node2Fragment',
        value: function node2Fragment(el) {
            // 创建节点碎片
            var fragment = document.createDocumentFragment(),
                child;
            // 添加el的子节点
            while (child = el.firstChild) {
                fragment.appendChild(child);
            }

            return fragment;
        }
    }, {
        key: 'init',
        value: function init() {
            this.compileElement(this.$fragment);
        }
    }, {
        key: 'compileElement',
        value: function compileElement(el) {
            //childNodes 属性返回节点的子节点集合，以 NodeList 对象
            // childNodes属性返回的数组中包含着所有类型的节点，所有的属性节点和文本节点也包含在其中
            var childNodes = el.childNodes,
                self = this;
            // 将具有length属性的对象转换成数组
            [].slice.call(childNodes).forEach(function (node) {
                // 获得元素的文本内容
                var text = node.textContent;
                console.log("textContent:", node, text, self.isElementNode(node));
                var reg = /\{\{(.*)\}\}/;

                if (self.isElementNode(node)) {
                    self.compile(node);
                } else if (self.isTextNode(node) && reg.test(text)) {
                    self.compileText(node, RegExp.$1);
                }

                if (node.childNodes && node.childNodes.length) {
                    self.compileElement(node);
                }
            });
        }
    }, {
        key: 'compile',
        value: function compile(node) {
            // 获取节点所有属性
            // 例如： id="test"
            var nodeAttrs = node.attributes,
                self = this;
            [].slice.call(nodeAttrs).forEach(function (attr) {
                // 获取属性名
                // 例如 id
                var attrName = attr.name;
                // 判断是否是绑定指令
                if (self.isDirective(attrName)) {
                    // 获取属性值
                    // 例如 test
                    var exp = attr.value;
                    var dir = attrName.substring(2);
                    // 事件指令
                    if (self.isEventDirective(dir)) {
                        compileUtil.eventHandler(node, self.$vm, exp, dir);
                        // 普通指令
                    } else {
                        compileUtil[dir] && compileUtil[dir](node, self.$vm, exp);
                    }
                }
            });
        }
    }, {
        key: 'compileText',
        value: function compileText(node, exp) {
            compileUtil.text(node, this.$vm, exp);
        }
    }, {
        key: 'isDirective',
        value: function isDirective(attr) {
            return attr.indexOf('v-') == 0;
        }
    }, {
        key: 'isEventDirective',
        value: function isEventDirective(dir) {
            return dir.indexOf('on') === 0;
        }
    }, {
        key: 'isTextNode',
        value: function isTextNode(node) {
            return node.nodeType == 3;
        }
    }, {
        key: 'isElementNode',
        value: function isElementNode(node) {
            // nodeType: 
            // 元素节点：1
            //属性节点：2
            //文本节点：3
            //注释节点：8
            return node.nodeType == 1;
        }
    }]);
    return Compile;
}();

var Vue = function () {
    function Vue(option) {
        var _this = this;

        classCallCheck(this, Vue);

        this.$options = option;
        var data = this.$data = option.data;

        Object.keys(data).forEach(function (key) {
            _this._proxy(key);
        });
        if (data) {
            observe(data, this);
        } else {
            observe(this.$data = {}, true);
        }

        this.$compile = new Compile(this.$options.el || document.body, this);
    }

    // vm.data.xxx ——> vm.xxx


    createClass(Vue, [{
        key: '_proxy',
        value: function _proxy(key) {
            var self = this;
            Object.defineProperty(self, key, {
                enumerable: true,
                configurable: false,
                get: function get$$1() {
                    return self.$data[key];
                },
                set: function set$$1(newVal) {
                    self.$data[key] = newVal;
                }
            });
        }
    }]);
    return Vue;
}();

/**
 * 静态属性es6没有，需要es7
 * 因此es6手动绑定
 */
Vue.version = '0.0.1';

return Vue;

})));
