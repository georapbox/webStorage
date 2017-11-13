/*!
 * webStorage - A minimal Javascript library that improves the way you work with localStorage or sessionStorage.
 * 
 * @version v2.1.1
 * @author George Raptis <georapbox@gmail.com> (georapbox.github.io)
 * @homepage https://github.com/georapbox/webStorage#readme
 * @repository https://github.com/georapbox/webStorage.git
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grEventDispatcher = __webpack_require__(1);

var _grEventDispatcher2 = _interopRequireDefault(_grEventDispatcher);

var _removePrefix = __webpack_require__(2);

var _removePrefix2 = _interopRequireDefault(_removePrefix);

var _trim = __webpack_require__(3);

var _trim2 = _interopRequireDefault(_trim);

var _assign = __webpack_require__(4);

var _assign2 = _interopRequireDefault(_assign);

var _isStorageSupported = __webpack_require__(5);

var _isStorageSupported2 = _interopRequireDefault(_isStorageSupported);

var _createKeyPrefix = __webpack_require__(6);

var _createKeyPrefix2 = _interopRequireDefault(_createKeyPrefix);

var _iterateStorage = __webpack_require__(7);

var _iterateStorage2 = _interopRequireDefault(_iterateStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dbNameError = 'You must use a valid name for the database.';
var keySeparatorError = 'keySeparator must be a non empty string';

/**
 * Default webStorage configuration
 * @private
 * @type {Object}
 */
var defaultConfig = {
  driver: localStorage,
  name: 'webStorage',
  keySeparator: '/'
};

/**
 * Holds the events names for reference
 * @private
 * @type {Object}
 */
var events = {
  set: 'setItem',
  set_err: 'setItemError',
  get: 'getItem',
  get_err: 'getItemError',
  remove: 'removeItem',
  remove_err: 'removeItemError',
  clear: 'clear'
};

var WebStorage = function () {
  /**
   * WebStorage constructor
   *
   * @constructor
   * @param {Object} [options] Object that contains config options to extend defaults.
   * @throws {TypeError} If a `options.name` is not a string or an empty string.
   * @throws {TypeError} If a `options.keySeparator` is not a string or an empty string.
   */
  function WebStorage(options) {
    _classCallCheck(this, WebStorage);

    options = (0, _assign2.default)({}, defaultConfig, options);

    if (typeof options.name !== 'string' || (0, _trim2.default)(options.name) === '') {
      throw new TypeError(dbNameError);
    }

    if (typeof options.keySeparator !== 'string' || (0, _trim2.default)(options.keySeparator) === '') {
      throw new TypeError(keySeparatorError);
    }

    this.options = options;
    this.storeKeyPrefix = (0, _createKeyPrefix2.default)(this);
    _grEventDispatcher2.default.apply(Object.getPrototypeOf(this));
  }

  /**
   * Creates a new instance of WebStorage.
   *
   * @param {Object} options Object that contains config options to extend defaults.
   * @return {WebStorage} A new WebStorage instance.
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
     * @throws {TypeError} If a `options.name` is not a string or an empty string.
     * @throws {TypeError} If a `options.keySeparator` is not a string or an empty string.
     * @return {WebStorage} The WebStorage instance for chaining.
     */

  }, {
    key: 'config',
    value: function config(options) {
      options = (0, _assign2.default)({}, this.options, options);

      if (typeof options.name !== 'string' || (0, _trim2.default)(options.name) === '') {
        throw new TypeError(dbNameError);
      }

      if (typeof options.keySeparator !== 'string' || (0, _trim2.default)(options.keySeparator) === '') {
        throw new TypeError(keySeparatorError);
      }

      this.options = options;
      this.storeKeyPrefix = (0, _createKeyPrefix2.default)(this);
      return this;
    }

    /**
     * Gets a saved item from storage by its key.
     *
     * @this {WebStorage}
     * @param {String} key The property name of the saved item.
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
      }
    }

    /**
     * Saves an item to storage.
     *
     * @this {WebStorage}
     * @param {String} key The property name of the item to save.
     * @param {*} [value=null] The item to save to the selected storage.
     * @return {WebStorage} The WebStorage instance for chaining.
     */

  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      try {
        value = value == null ? null : value;
        key = this.storeKeyPrefix + key;
        this.options.driver.setItem(key, JSON.stringify(value));
        this.dispatchEvent({ type: events.set, data: value });
      } catch (error) {
        this.dispatchEvent({ type: events.set_err, data: error });
      }
      return this;
    }

    /**
     * Removes the item for the specific key from the storage.
     *
     * @this {WebStorage}
     * @param {String} key The property name of the item to remove.
     * @return {WebStorage} The WebStorage instance for chaining.
     */

  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      try {
        this.options.driver.removeItem(this.storeKeyPrefix + key);
        this.dispatchEvent({ type: events.remove, data: key });
      } catch (error) {
        this.dispatchEvent({ type: events.remove_err, data: key });
      }
      return this;
    }

    /**
     * Removes all saved items from storage.
     *
     * @this {WebStorage}
     * @return {WebStorage} The WebStorage instance for chaining.
     */

  }, {
    key: 'clear',
    value: function clear() {
      var driver = this.options.driver;
      (0, _iterateStorage2.default)(this, driver.removeItem.bind(driver));
      this.dispatchEvent({ type: events.clear });
      return this;
    }

    /**
     * Gets the list of all keys in the offline storage for a specific database.
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
        return keysArr.push((0, _removePrefix2.default)(key, storeKeyPrefix));
      });
      return keysArr;
    }

    /**
     * Gets the number of items saved in a specific database.
     *
     * @this {WebStorage}
     * @return {Number} The number of items for a specific database.
     */

  }, {
    key: 'length',
    value: function length() {
      return this.keys().length;
    }

    /**
     * Iterate over all value/key pairs in datastore.
     *
     * @this {WebStorage}
     * @param {function} iteratorCallback A callabck function to be executed for each iteration.
     *        `iteratorCallback` is called once for each pair, with the following arguments:
     *        - {String} key The key of the saved item.
     *        - {*} value The value of the saved item.
     * @return {WebStorage} The WebStorage instance for chaining.
     */

  }, {
    key: 'iterate',
    value: function iterate(iteratorCallback) {
      var _this = this;

      var storeKeyPrefix = this.storeKeyPrefix;

      (0, _iterateStorage2.default)(this, function (key, value) {
        var _key = (0, _removePrefix2.default)(key, storeKeyPrefix);
        var _value = JSON.parse(value);
        iteratorCallback && iteratorCallback.call(_this, _key, _value);
      });

      return this;
    }

    /**
     * Display (approximately) the size for each saved item in datastore and the total size of all items in MB.
     *
     * @this {WebStorage}
     * @return {Object<string,number>} An object with two properties that display the size for each saved item and the total size in MB.
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
     * It may return `false` if storage is full.
     *
     * @this {WebStorage}
     * @return {Boolean} True if driver is supported; otherwise false.
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @module eventDispatcher
 * @desc JavaScript events for custom objects
 */
(function (name, context, definition) {
  'use strict';

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removePrefix;
function removePrefix(str, prefix) {
  return str.indexOf(prefix) === 0 ? str.slice(prefix.length) : str;
}
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trim;
function trim(str) {
  return String.prototype.trim ? str.trim() : str.replace(/(^\s*|\s*$)/g, '');
}
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assign;
function assign(target) {
  if (target == null) {
    // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); index += 1) {
    var nextSource = arguments.length <= index + 1 ? undefined : arguments[index + 1];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
}
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
  return "" + instance.options.name + instance.options.keySeparator;
}

exports.default = createKeyPrefix;
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyBelongsToDb = __webpack_require__(8);

var _keyBelongsToDb2 = _interopRequireDefault(_keyBelongsToDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper function that iterates over storage keys.
 *
 * @param {Object} instance The WebStorage instance.
 * @param {function} callback A function to be executed for each iteration.
 * @return {undefined}
 */
function iterateStorage(instance, callback) {
  var driver = instance.options.driver;

  Object.keys(driver).forEach(function (key) {
    if ((0, _keyBelongsToDb2.default)(instance, key)) {
      callback(key, driver[key]);
    }
  });
}

exports.default = iterateStorage;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _beginsWith = __webpack_require__(9);

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = beginsWith;
function beginsWith(str, prefix) {
  return str.substr(0, prefix.length) === prefix;
}
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=webStorage.js.map