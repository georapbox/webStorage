/*!
 * webStorage - A minimal Javascript wrapper to work with localStorage and sessionStorage
 * 
 * @version v1.1.0
 * @author George Raptis <georapbox@gmail.com> (georapbox.github.io)
 * @homepage https://github.com/georapbox/webStorage#readme
 * @repository git+https://github.com/georapbox/webStorage.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("webStorage", [], factory);
	else if(typeof exports === 'object')
		exports["webStorage"] = factory();
	else
		root["webStorage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _grEventDispatcher = __webpack_require__(9);
	
	var _grEventDispatcher2 = _interopRequireDefault(_grEventDispatcher);
	
	var _removePrefix = __webpack_require__(1);
	
	var _removePrefix2 = _interopRequireDefault(_removePrefix);
	
	var _trim = __webpack_require__(2);
	
	var _trim2 = _interopRequireDefault(_trim);
	
	var _extend = __webpack_require__(3);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	var _isStorageSupported = __webpack_require__(4);
	
	var _isStorageSupported2 = _interopRequireDefault(_isStorageSupported);
	
	var _createKeyPrefix = __webpack_require__(5);
	
	var _createKeyPrefix2 = _interopRequireDefault(_createKeyPrefix);
	
	var _iterateStorage = __webpack_require__(6);
	
	var _iterateStorage2 = _interopRequireDefault(_iterateStorage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Default webStorage configuration
	 * @private
	 * @type {Object}
	 */
	var defaultConfig = {
	  driver: localStorage,
	  name: 'webStorage'
	};
	
	var events = {
	  set: 'setItem',
	  set_err: 'setItemError',
	  get: 'getItem',
	  get_err: 'getItemError',
	  remove: 'removeItem',
	  clear: 'clear'
	};
	
	var WebStorage = function () {
	  /**
	   * WebStorage constructor
	   *
	   * @constructor
	   * @param {Object} [options] Object that contains config options to extend defaults.
	   */
	  function WebStorage(options) {
	    _classCallCheck(this, WebStorage);
	
	    options = (0, _extend2.default)({}, defaultConfig, options);
	
	    if (options.name == null || (0, _trim2.default)(options.name) === '') {
	      throw 'You must use a valid name for the database.';
	    }
	
	    this.options = options;
	    this.storeKeyPrefix = (0, _createKeyPrefix2.default)(this);
	  }
	
	  /**
	   * Creates a new instance of WebStorage.
	   *
	   * @param {Object} options Object that contains config options to extend defaults.
	   * @return {Object} The WebStorage new instance.
	   */
	
	
	  _createClass(WebStorage, [{
	    key: 'createInstance',
	    value: function createInstance(options) {
	      var ws = new WebStorage(options);
	      _grEventDispatcher2.default.apply(Object.getPrototypeOf(ws));
	      return ws;
	    }
	
	    /**
	     * Configures the instance of WebStorage with user's options that will extend the defaults.
	     *
	     * @this {WebStorage}
	     * @param {Object} options Object that contains config options to extend defaults.
	     * @return {undefined}
	     */
	
	  }, {
	    key: 'config',
	    value: function config(options) {
	      options = (0, _extend2.default)({}, defaultConfig, options);
	
	      if (options.name == null || (0, _trim2.default)(options.name) === '') {
	        throw 'You must use a valid name for the database.';
	      }
	
	      this.options = options;
	      this.storeKeyPrefix = (0, _createKeyPrefix2.default)(this);
	    }
	
	    /**
	     * Gets a saved item from localStorage or sessionStorage by its key.
	     *
	     * @this {WebStorage}
	     * @param {String} key The property name of the item to save.
	     * @throws {Error} Will throw if for some reason item cannot be retrieved from storage.
	     * @return {*} Returns the saved item.
	     */
	
	  }, {
	    key: 'getItem',
	    value: function getItem(key) {
	      var item = this.options.driver.getItem(this.storeKeyPrefix + key);
	
	      try {
	        var _item = JSON.parse(item);
	        this.dispatchEvent({ type: events.get, data: _item });
	        return _item;
	      } catch (error) {
	        this.dispatchEvent({ type: events.get_err, data: error });
	        throw error;
	      }
	    }
	
	    /**
	     * Saves an item to localStorage or sessionStorage.
	     *
	     * @this {WebStorage}
	     * @param {String} key The property name of teh item to save.
	     * @param {*} value The item to save to the selected storage.
	     * @throws {Error} Will throw if for some reason item cannot be saved to storage.
	     * @return {*} Returns the saved item's value if save successful otherwise throws error.
	     */
	
	  }, {
	    key: 'setItem',
	    value: function setItem(key, value) {
	      try {
	        value = value == null ? null : value;
	        key = this.storeKeyPrefix + key;
	        this.options.driver.setItem(key, JSON.stringify(value));
	        this.dispatchEvent({ type: events.set, data: value });
	        return value;
	      } catch (error) {
	        this.dispatchEvent({ type: events.set_err, data: error });
	        throw error;
	      }
	    }
	
	    /**
	     * Removes an item from storage.
	     *
	     * @this {WebStorage}
	     * @param {String} key The property name of the item to remove.
	     * @return {undefined}
	     */
	
	  }, {
	    key: 'removeItem',
	    value: function removeItem(key) {
	      this.dispatchEvent({ type: events.remove, data: key });
	      this.options.driver.removeItem(this.storeKeyPrefix + key);
	    }
	
	    /**
	     * Removes all saved items from storage.
	     *
	     * @NOTE The above applies only in cases that a new instance is created and the "name" is set.
	     *       This is because the only way to tell if an item is saved by an instance is the prefix of the key which is the "name" property.
	     *       If a new instance is created but does not have "name" set, then .clear() will clear all items from the driver set.
	     * @this {WebStorage}
	     * @param {Boolean} clearAll If true, will clear all items from local(session)Storage, else will clear only the items saved by the instance created.
	     * @return {undefined}
	     */
	
	  }, {
	    key: 'clear',
	    value: function clear(clearAll) {
	      var driver = this.options.driver;
	
	      if (clearAll === true) {
	        driver.clear();
	      } else {
	        (0, _iterateStorage2.default)(this, function (key) {
	          driver.removeItem(key);
	        });
	      }
	
	      this.dispatchEvent({ type: events.clear });
	    }
	
	    /**
	     * Gets the list of all keys in the offline storage for a specific database.
	     * If "name" property is not set or set to '' (empty string), returns all keys in storage.
	     *
	     * @this {WebStorage}
	     * @return {Array} An array of all the keys that belong to a specific database.
	     */
	
	  }, {
	    key: 'keys',
	    value: function keys() {
	      var keysArr = [];
	      var storeKeyPrefix = this.storeKeyPrefix;
	
	      (0, _iterateStorage2.default)(this, function (key) {
	        keysArr.push((0, _removePrefix2.default)(key, storeKeyPrefix));
	      });
	
	      return keysArr;
	    }
	
	    /**
	     * Gets the number of keys in the datastore.
	     *
	     * @this {WebStorage}
	     * @return {Number} The number of keys in the datastore.
	     */
	
	  }, {
	    key: 'length',
	    value: function length() {
	      var counter = 0;
	
	      (0, _iterateStorage2.default)(this, function () {
	        counter += 1;
	      });
	
	      return counter;
	    }
	
	    /**
	     * Iterate over all value/key pairs in datastore.
	     *
	     * @this {WebStorage}
	     * @param {function} callback A callabck function to execute for each iteration.
	     * @return {undefined}
	     */
	
	  }, {
	    key: 'iterate',
	    value: function iterate(callback) {
	      var storeKeyPrefix = this.storeKeyPrefix;
	
	      (0, _iterateStorage2.default)(this, function (key, value, iterationNumber) {
	        var _key = (0, _removePrefix2.default)(key, storeKeyPrefix);
	        var _value = JSON.parse(value);
	
	        if (callback && callback(_key, _value, iterationNumber) === false) {
	          return false;
	        }
	      });
	    }
	
	    /**
	     * Display (approximately) the size for each key in datastore and the total size of all kesy in MB.
	     *
	     * @this {WebStorage}
	     * @return {Object<string,number>} An object with two properties that display the size for each key and the total size in MB.
	     */
	
	  }, {
	    key: 'quota',
	    value: function quota() {
	      var items = {};
	      var totalSize = 0;
	
	      (0, _iterateStorage2.default)(this, function (key, value) {
	        var itemSize = value.length * 2 / 1024 / 1024;
	        totalSize += itemSize;
	        items[key] = itemSize;
	      });
	
	      return {
	        total: totalSize,
	        items: items
	      };
	    }
	
	    /**
	     * Checks if the driver of choice (localStorage or sessionStorage) is supported.
	     * It will return `false` if storage is full.
	     *
	     * @this {WebStorage}
	     * @return {Boolean} Returns true if Web Storage is supported; otherwise false.
	     */
	
	  }, {
	    key: 'supported',
	    value: function supported() {
	      return (0, _isStorageSupported2.default)(this.options.driver);
	    }
	  }]);
	
	  return WebStorage;
	}();
	
	exports.default = new WebStorage();
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = removePrefix;
	function removePrefix(str, prefix) {
	  return str.indexOf(prefix) === 0 ? str.slice(prefix.length) : str;
	}
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = trim;
	function trim(str) {
	  return String.prototype.trim ? str.trim() : str.replace(/(^\s*|\s*$)/g, '');
	}
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = _obj_extend;
	function _obj_extend() {
	  for (var i = 1, l = arguments.length; i < l; i++) {
	    for (var key in arguments[i]) {
	      if ({}.hasOwnProperty.call(arguments[i], key)) {
	        if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
	          arguments[0][key] = arguments[0][key] || {};
	          _obj_extend(arguments[0][key], arguments[i][key]);
	        } else {
	          arguments[0][key] = arguments[i][key];
	        }
	      }
	    }
	  }
	  return arguments[0];
	}
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Helper function to check if Web Storage is supported.
	 *
	 * @param {Object} storageType The type of the offline storage (localStorage || sessionStorage).
	 * @return {Boolean} Returns true if supported else returns false.
	 */
	function isStorageSupported(storageType) {
	  var dummy = 'storage.dummy';
	
	  try {
	    storageType.setItem(dummy, dummy);
	    storageType.removeItem(dummy);
	    return true;
	  } catch (error) {
	    return false;
	  }
	}
	
	exports.default = isStorageSupported;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Helper function that creates the storage key's prefix.
	 *
	 * @param {Object} instance The WebStorage instance.
	 * @return {String} Returns the keys's prefix.
	 */
	function createKeyPrefix(instance) {
	  return instance.options.name + "/";
	}
	
	exports.default = createKeyPrefix;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keyBelongsToDb = __webpack_require__(7);
	
	var _keyBelongsToDb2 = _interopRequireDefault(_keyBelongsToDb);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Helper function that iterates over storage keys.
	 * Early exit by returning false inside iterator callback.
	 *
	 * @param {Object} instance The WebStorage instance.
	 * @param {function} callback A function to be executed for each iteration.
	 * @return {undefined}
	 */
	function iterateStorage(instance, callback) {
	  var driver = instance.options.driver;
	  var iterationNumber = 0;
	
	  Object.keys(driver).forEach(function (key) {
	    if ((0, _keyBelongsToDb2.default)(instance, key)) {
	      if (callback(key, driver[key], ++iterationNumber) === false) {
	        return false;
	      }
	    }
	  });
	}
	
	exports.default = iterateStorage;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _beginsWith = __webpack_require__(8);
	
	var _beginsWith2 = _interopRequireDefault(_beginsWith);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Helper function that checks if a key belongs to a database.
	 * Check is done using the keys' prefix.
	 *
	 * @param {Object} instance The WebStorage instance.
	 * @param {String} key The key to check if belongs to a database.
	 * @return {Boolean} Returns true if key belongs to a database else returns false.
	 */
	function keyBelongsToDB(instance, key) {
	  return (0, _beginsWith2.default)(key, instance.storeKeyPrefix);
	}
	
	exports.default = keyBelongsToDB;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = beginsWith;
	function beginsWith(str, prefix) {
	  return str.substr(0, prefix.length) === prefix;
	}
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @module eventDispatcher
	 * @desc JavaScript events for custom objects
	 */
	(function (name, context, definition) {
	  'use strict';
	
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && module.exports) {
	    module.exports = definition();
	  } else {
	    context[name] = definition(name, context);
	  }
	}('eventDispatcher', this, function (name) {
	  'use strict';
	
	  var errors = {
	    nonExtensible: 'Cannot apply "' + name + '" on an non extensible object'
	  };
	
	  var eventDispatcherPrototype = {
	    /**
	     * Registers the specified `listener` on the event target it's called on.
	     *
	     * @function addEventListener
	     * @param {String} type A string representing the event type to listen for.
	     * @param {function} listener A function to be executed when an event of the specified `type` occurs.
	     * @throws {TypeError} If the object that `eventDispatcher` is applied to is not extensible.
	     * @return {Object} The `eventDispatcher` object.
	     */
	    addEventListener: function (type, listener) {
	      var listeners;
	
	      if (!Object.isExtensible(this)) {
	        throw new TypeError(errors.nonExtensible);
	      }
	
	      if (typeof this._listeners === 'undefined') {
	        this._listeners = {};
	      }
	
	      listeners = this._listeners;
	
	      if (typeof listeners[type] === 'undefined') {
	        listeners[type] = [];
	      }
	
	      if (listeners[type].indexOf(listener) === - 1) {
	        listeners[type].push(listener);
	      }
	
	      return this;
	    },
	
	    /**
	     * Checks if the target object has a `listener` registered on for specific event `type`..
	     *
	     * @function hasEventListener
	     * @param {String} type A string representing the event type.
	     * @param {function} listener The event listener to check if registered for the specified event `type`.
	     * @return {Boolean} True if target object has `listener` registered for specific event `type`; otherwise false.
	     */
	    hasEventListener: function (type, listener) {
	      var listeners;
	
	      if (typeof this._listeners === 'undefined') {
	        return false;
	      }
	
	      listeners = this._listeners;
	
	      if (typeof listeners[type] !== 'undefined' && listeners[type].indexOf(listener) !== - 1) {
	        return true;
	      }
	
	      return false;
	    },
	
	    /**
	     * Removes the previously registered event `listener` from the event target.
	     *
	     * @function removeEventListener
	     * @param {String} type A string representing the event type to remove.
	     * @param {function} listener The event listener function to remove from the event target.
	     * @return {Object} The `eventDispatcher` object.
	     */
	    removeEventListener: function (type, listener) {
	      var listeners, listenerArray, index;
	
	      if (typeof this._listeners === 'undefined') {
	        return;
	      }
	
	      listeners = this._listeners;
	      listenerArray = listeners[type];
	
	      if (typeof listenerArray !== 'undefined') {
	        index = listenerArray.indexOf(listener);
	
	        if (index !== - 1) {
	          listenerArray.splice(index, 1);
	        }
	      }
	
	      return this;
	    },
	
	    /**
	     * Dispatches an event at the specified event target.
	     *
	     * @function dispatchEvent
	     * @param {Object} event The event object to be dispatched.
	     * @return {Object} The `eventDispatcher` object.
	     */
	    dispatchEvent: function (event) {
	      var listeners, listenerArray, i, length;
	
	      if (typeof this._listeners === 'undefined') {
	        return;
	      }
	
	      listeners = this._listeners;
	      listenerArray = listeners[event.type];
	
	      if (typeof listenerArray !== 'undefined') {
	        event.target = this;
	
	        length = listenerArray.length;
	
	        for (i = 0; i < length; i += 1) {
	          listenerArray[i].call(this, event);
	        }
	      }
	
	      return this;
	    }
	  };
	
	  var eventDispatcher = Object.create(eventDispatcherPrototype, {
	    apply: {
	      /**
	       * Applies the `eventDispatcher` prototype methods to the event target.
	       *
	       * @function apply
	       * @param {Object} object The event target object.
	       * @throws {TypeError} If the object that `eventDispatcher` is applied to is not extensible.
	       * @return {Object} The `eventDispatcher` object.
	       */
	      value: function applyEventDispatcher(object) {
	        if (!Object.isExtensible(object)) {
	          throw new TypeError(errors.nonExtensible);
	        }
	
	        object.addEventListener = eventDispatcherPrototype.addEventListener;
	        object.hasEventListener = eventDispatcherPrototype.hasEventListener;
	        object.removeEventListener = eventDispatcherPrototype.removeEventListener;
	        object.dispatchEvent = eventDispatcherPrototype.dispatchEvent;
	
	        return this;
	      }
	    }
	  });
	
	  return eventDispatcher;
	}));


/***/ }
/******/ ])
});
;
//# sourceMappingURL=webStorage.js.map