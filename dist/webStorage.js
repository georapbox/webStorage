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
	      return new WebStorage(options);
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
	     * @return {*} Returns the saved item.
	     */
	
	  }, {
	    key: 'getItem',
	    value: function getItem(key) {
	      var item = this.options.driver.getItem(this.storeKeyPrefix + key);
	
	      try {
	        return JSON.parse(item);
	      } catch (error) {
	        throw error;
	      }
	    }
	
	    /**
	     * Saves an item to localStorage or sessionStorage.
	     *
	     * @this {WebStorage}
	     * @param {String} key The property name of teh item to save.
	     * @param {*} value The item to save to the selected storage.
	     * @return {*} Returns the saved item's value if save successful else throws error.
	     */
	
	  }, {
	    key: 'setItem',
	    value: function setItem(key, value) {
	      var that = this;
	
	      try {
	        value = value == null ? null : value;
	        key = that.storeKeyPrefix + key;
	        that.options.driver.setItem(key, JSON.stringify(value));
	        return value;
	      } catch (error) {
	        if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
	          throw new Error('Could not save item due to quota exceed.');
	        } else {
	          throw error;
	        }
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=webStorage.js.map