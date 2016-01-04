/**
 * webStorage.js
 * A minimal Javascript wrapper to work with Web Storage
 */
(function (name, context, definition) {
    'use strict';
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else if (typeof define === 'function' && define.amd) {
        define(definition);
    } else {
        context[name] = definition();
    }
}('webStorage', this, function () {
    'use strict';

    // HELPER FUNCTIONS
    /* -------------------------------------------------------------------- */

    /**
     * Checks if Storage is supported.
     * @param {Object} storageType Available values: localStorage & sessionStorage.
     * @return {Boolean} Returns true if Storage is supported , else returns false.
     */
    function _isStorageSupported(storageType) {
        var dummy = 'storage.dummy';
        try {
            storageType.setItem(dummy, dummy);
            storageType.removeItem(dummy);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Returns a substring denoted by n (positive or negative) characters.
     * If n >= 0, returns a substring from the left end of the string.
     * If n < 0, returns a substring from the right end of the string.
     * If n is not of type number, returns the whole string intact.
     * @param {String} str The initial string.
     * @param {Number} n   The number of characters of the new string.
     * @returns {String}   The final string.
     */
    function _subStr(str, n) {
        if (typeof n === 'number') {
            return n >= 0 ? str.substr(0, n) : str.substr(str.length + n, -n);
        }
        return str;
    }

    /**
     * Merges (deep copy) the contents of two or more objects together into the first object.
     * @param {Object} target The object to extend. It will receive the new properties.
     * @param {Object} object1 An object containing additional properties to merge in.
     * @param {Object} objectN Additional objects containing properties to merge in.
     * @use extend({}, obj1, objN)
    */
    function _extend() {
        for (var i = 1, l = arguments.length; i < l; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
                        arguments[0][key] = arguments[0][key] || {};
                        _extend(arguments[0][key], arguments[i][key]);
                    } else {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
        }
        return arguments[0];
    }

    /**
     * Creates the storage key be prefixing the user's key,
     * using the "name" and "storeName" from config object passed.
     * @param {Object} instance The instance of the webStorage that is currently in use.
     * @return {String} The final storage key prefixed string.
     */
    function _constructStorageKey(instance) {
        var name = instance.options.name;
        var storeName = instance.options.storeName;
        var finalStorageKey = '';
        // @NOTE: Using non strict equality to check for both null and undefined.
        finalStorageKey += name != null && name !== '' ? name + '/' : ''; // jshint ignore: line
        finalStorageKey += storeName != null && storeName !== '' ? storeName + '/' : ''; // jshint ignore: line
        return finalStorageKey;
    }

    // PUBLIC API
    /* -------------------------------------------------------------------- */

    var proto;
    var defaultConfig = {
        driver: localStorage,
        name: 'webStorage',
        storeName: null
    };

    /**
     * @constructor
     * Creates a new instance of WebStorage.
     * @param {Object} options Object that contains config options to extend defaults.
     */
    function WebStorage(options) {
        options = _extend({}, defaultConfig, options);
        if (_isStorageSupported(options.driver)) {
            this.options = options;
            this.storeKeyPrefix = _constructStorageKey(this, this.options);
        } else {
            throw 'Web Storage is not supported by your browser.';
        }
    }

    proto = WebStorage.prototype;

    /**
     * Creates a new instance of WebStorage.
     * @param {Object} options Object that contains config options to extend defaults.
     */
    proto.createInstance = function (options) {
        return new WebStorage(options);
    };

    /**
     * Configures the instance of WebStorage with user's options that will extend the defaults.
     * @param {Object} options Object that contains config options to extend defaults.
     */
    proto.config = function (options) {
        options = _extend({}, defaultConfig, options);
        this.options = options;
        this.storeKeyPrefix = _constructStorageKey(this, this.options);
    };

    /**
     * Gets a saved item from localStorage or sessionStorage by its key.
     * @param {String} key The property name of the item to save.
     * @return {*} Returns the saved item.
     */
    proto.getItem = function (key) {
        var item = this.options.driver.getItem(this.storeKeyPrefix + key);
        try {
            return JSON.parse(item);
        } catch (err) {
            return item;
        }
    };

    /**
     * Saves an item to localStorage or sessionStorage.
     * @param key {String} The property name of teh item to save.
     * @param value {*} The item to save to storage.
     * @return {*} Returns the saved item's value if save successful else throws error.
     */
    proto.setItem = function (key, value) {
        var self = this;
        try {
            key = self.storeKeyPrefix + key;
            self.options.driver.setItem(key, JSON.stringify(value));
            return value;
        } catch (error) {
            if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                throw new Error('Could not save item due to quota exceed.');
            } else {
                throw error;
            }
        }
    };

    /**
     * Removes an item from localStorage or sessionStorage.
     * @param key {String} The property name of the item to remove.
     */
    proto.removeItem = function (key) {
        this.options.driver.removeItem(this.storeKeyPrefix + key);
    };

    /**
     * Removes all saved items from localStorage or sessionStorage.
     * @param {Boolean} clearAll If true, will clear all items from local(session)Storage, else will clear only the items saved by the instance created.
     *
     * NOTE: The above applies only in cases that a new instance is created and at least one of "name" or "storeName" is set.
     * This is because the only way to tell if an item is saved by an instance is the prefix of the key which is a combination of "name" & "storeName" properties.
     * If a new instance is created but does not have "name" or "storeName" set, then .clear() will clear all items from the driver set.
     */
    proto.clear = function (clearAll) {
        var driver = this.options.driver,
            storeKeyPrefix = this.storeKeyPrefix,
            storeKeyPrefixLength = storeKeyPrefix.length,
            key;

        if (clearAll === true) {
            driver.clear();
        } else {
            for (key in driver) {
                if (driver.hasOwnProperty(key)) {
                    if (storeKeyPrefix === _subStr(key, storeKeyPrefixLength)) {
                        driver.removeItem(key);
                    }
                }
            }
        }
    };

    /* Return a new instance of WebStorage */
    return new WebStorage();
}));
