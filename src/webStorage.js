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

    function _subStr(str, n) {
        if (typeof n === 'number') {
            return n >= 0 ? str.substr(0, n) : str.substr(str.length + n, -n);
        }
        return str;
    }

    function _trimStr(str) {
        return String.prototype.trim ? str.trim() : str.replace(/(^\s*|\s*$)/g, '');
    }

    function _removePrefixStr(str, prefix) {
        return str.indexOf(prefix) === 0 ? str.slice(prefix.length) : str;
    }

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

    function _constructStorageKey(instance) {
        return instance.options.name + '/';
    }

    function _keyBelongsToDB(instance, key) {
        var storeKeyPrefix = instance.storeKeyPrefix;
        var storeKeyPrefixLen = storeKeyPrefix.length;
        return storeKeyPrefix === _subStr(key, storeKeyPrefixLen);
    }

    // PUBLIC API
    /* -------------------------------------------------------------------- */

    var proto;
    var defaultConfig = {
        driver: localStorage,
        name: 'webStorage'
    };

    /**
     * @constructor
     * Creates a new instance of WebStorage.
     * @param {Object} options Object that contains config options to extend defaults.
     */
    function WebStorage(options) {
        options = _extend({}, defaultConfig, options);
        if (options.name == null || _trimStr(options.name) === '') { // jshint ignore: line
            throw 'You must use a valid name for the database.';
        }
        if (_isStorageSupported(options.driver)) {
            this.options = options;
            this.storeKeyPrefix = _constructStorageKey(this);
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
        if (options.name == null || _trimStr(options.name) === '') { // jshint ignore: line
            throw 'You must use a valid name for the database.';
        }
        this.options = options;
        this.storeKeyPrefix = _constructStorageKey(this);
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
     * NOTE: The above applies only in cases that a new instance is created and the "name" is set.
     * This is because the only way to tell if an item is saved by an instance is the prefix of the key which is the "name" property.
     * If a new instance is created but does not have "name" set, then .clear() will clear all items from the driver set.
     */
    proto.clear = function (clearAll) {
        var driver = this.options.driver,
            key;

        if (clearAll === true) {
            driver.clear();
        } else {
            for (key in driver) {
                if (driver.hasOwnProperty(key)) {
                    if (_keyBelongsToDB(this, key)) {
                        driver.removeItem(key);
                    }
                }
            }
        }
    };

    /**
     * Gets the list of all keys in the offline storage for a specific database.
     * If "name" property is not set or set to '' (empty string), returns all keys in storage.
     * @return {Array} An array of all the keys that belong to a specific database.
     */
    proto.keys = function () {
        var driver = this.options.driver,
            storeKeyPrefix = this.storeKeyPrefix,
            keysArr = [],
            key;

        for (key in driver) {
            if (driver.hasOwnProperty(key)) {
                if (_keyBelongsToDB(this, key)) {
                    keysArr.push(_removePrefixStr(key, storeKeyPrefix));
                }
            }
        }

        return keysArr;
    };

    /* Return a new instance of WebStorage */
    return new WebStorage();
}));
