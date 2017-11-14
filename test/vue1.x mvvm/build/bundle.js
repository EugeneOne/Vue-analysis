/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 		    exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';var _observer = __webpack_require__(1);var _observer2 = _interopRequireDefault(_observer);
	var _vue = __webpack_require__(2);var _vue2 = _interopRequireDefault(_vue);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

	var v = new _vue2.default({
	  data: {
	    a: 1,
	    b: 2 } });



	v.$watch('a', function () {console.log('赋值成功');});

	setTimeout(function () {
	  v.a = 2;
	  console.log(v.a);
	}, 1000);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();exports.












































	observer = observer;var _dep = __webpack_require__(4);var _dep2 = _interopRequireDefault(_dep);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Observer = function () {function Observer(value) {_classCallCheck(this, Observer);this.data = value;this.walk(value);}_createClass(Observer, [{ key: 'walk', value: function walk(value) {var _this = this;Object.keys(value).forEach(function (key) {_this.covert(key, _this.data[key]);});} }, { key: 'covert', value: function covert(key, val) {this.defineReactive(this.data, key, val);} }, { key: 'defineReactive', value: function defineReactive(data, key, val) {var dep = new _dep2.default(); //var childOb = observer(val)
	      observer(data[key]);Object.defineProperty(data, key, { enumerable: true, configurable: true, get: function get() {if (_dep2.default.target) {dep.addSubs(_dep2.default.target);}return val;}, set: function set(newVal) {console.log("newVal:", newVal);if (val == newVal) {return;}val = newVal; //data[key] = newVal
	          //childOb = observer(newVal)
	          dep.notify();} });} }]);return Observer;}();exports.default = Observer;function observer(value) {if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !value) {return;}
	  new Observer(value);
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _watcher = __webpack_require__(3);var _watcher2 = _interopRequireDefault(_watcher);
	var _observer = __webpack_require__(1);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

	Vue = function () {
	    function Vue(option) {var _this = this;_classCallCheck(this, Vue);
	        this.$option = option;
	        var data = this._data = option.data;
	        Object.keys(data).forEach(function (key) {
	            _this._proxy(key);
	        });
	        (0, _observer.observer)(data);
	    }_createClass(Vue, [{ key: '$watch', value: function $watch(
	        expFn, cb) {
	            new _watcher2.default(this, expFn, cb);
	        }
	        // vm.data.xx ——> vm.xxx
	    }, { key: '_proxy', value: function _proxy(key) {
	            var self = this;
	            Object.defineProperty(self, key, {
	                configurable: false,
	                enumerable: true,
	                get: function get() {
	                    return self._data[key];
	                },
	                set: function set(newValue) {
	                    self._data[key] = newValue;
	                } });

	        } }]);return Vue;}();exports.default = Vue;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _dep = __webpack_require__(4);var _dep2 = _interopRequireDefault(_dep);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

	Watcher = function () {
	    function Watcher(vm, expFn, cb) {_classCallCheck(this, Watcher);
	        this.vm = vm;
	        this.expFn = expFn;
	        this.cb = cb;
	        this.value = this.get();
	    }_createClass(Watcher, [{ key: 'get', value: function get()
	        {
	            _dep2.default.target = this;
	            var value = this.vm._data[this.expFn];
	            _dep2.default.target = null;
	            return value;
	        } }, { key: 'update', value: function update()
	        {
	            this.run();
	        } }, { key: 'run', value: function run()
	        {
	            var self = this;
	            var value = this.get();
	            var oldVal = this.value;
	            if (value != oldVal) {
	                this.value = value;
	                this.cb.call(self.vm);
	            }
	        } }]);return Watcher;}();exports.default = Watcher;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Dep = function () {
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

/***/ })
/******/ ]);