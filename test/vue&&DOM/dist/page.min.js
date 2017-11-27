/*!
 *  * vue-test v1.0.0
 *  * (c) 2017-09-10--2017-11-21 wyq
 *  * Released under the ISC License.
 *  * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Dep = function () {
    function Dep() {_classCallCheck(this, Dep);
        this.subs = "";
    }_createClass(Dep, [{ key: "notify", value: function notify()
        {
            this.subs.update();
        } }, { key: "addSubs", value: function addSubs(
        value) {
            this.subs = value;
        } }]);return Dep;}();exports.default = Dep;


Dep.target = null;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _vue = __webpack_require__(2);var _vue2 = _interopRequireDefault(_vue);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                        * 静态属性es6没有，需要es7
                                                                                                                                                                                                                                                        * 因此es6手动绑定
                                                                                                                                                                                                                                                        */
_vue2.default.version = '0.0.1';exports.default = _vue2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _index = __webpack_require__(3);var _index2 = _interopRequireDefault(_index);
var _watcher = __webpack_require__(4);var _watcher2 = _interopRequireDefault(_watcher);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Vue = function () {
    function Vue(option) {var _this = this;_classCallCheck(this, Vue);
        this.$option = option;
        var data = this.$data = option.data;

        Object.keys(data).forEach(function (key) {
            _this._proxy(key);
        });
        (0, _index2.default)(data);
    }

    // vm.data.xxx ——> vm.xxx
    _createClass(Vue, [{ key: '_proxy', value: function _proxy(key) {
            var self = this;
            Object.defineProperty(self, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    return self.$data[key];
                },
                set: function set(newVal) {
                    self.$data[key] = newVal;
                } });

        } }, { key: '$watch', value: function $watch(

        expFn, cb) {
            new _watcher2.default(this, expFn, cb);
        } }]);return Vue;}();exports.default = Vue;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();exports.

































observe = observe;var _dep = __webpack_require__(0);var _dep2 = _interopRequireDefault(_dep);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Observe = function () {function Observe(val) {_classCallCheck(this, Observe);this.data = val;this.walk(val);}_createClass(Observe, [{ key: 'walk', value: function walk(val) {var _this = this;Object.keys(val).forEach(function (key) {_this.defineReactive(_this.data, key, val);});} }, { key: 'defineReactive', value: function defineReactive(data, key, val) {var dep = new _dep2.default();Object.defineProperty(data, key, { configurable: true, enumerable: true, get: function get() {if (_dep2.default.target) {dep.addSubs(_dep2.default.target);}return val;}, set: function set(newVal) {if (newVal = val) {return;}val = newVal;dep.notify();} });} }]);return Observe;}();exports.default = Observe;function observe(val) {
    if (!val || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) != 'object') {
        return;
    }
    new Observe(val);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _dep = __webpack_require__(0);var _dep2 = _interopRequireDefault(_dep);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Watcher = function () {
    function Watcher(vm, expFn, cb) {_classCallCheck(this, Watcher);
        this.vm = vm;
        this.expFn = expFn;
        this.cb = cb;
        this.value = this.get();
    }_createClass(Watcher, [{ key: 'get', value: function get()

        {
            _dep2.default.target = this;
            var value = vm.$data[this.expFn];
            _dep2.default.target = null;
            return value;
        } }, { key: 'update', value: function update()

        {
            this.run();
        } }, { key: 'run', value: function run()

        {
            var value = this.get();
            var oldValue = this.value;
            if (value != oldValue) {
                this.value = value;
                this.cb.call(this.vm, value, oldValue);
            }
        } }]);return Watcher;}();exports.default = Watcher;

/***/ })
/******/ ]);