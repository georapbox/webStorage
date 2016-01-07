(function (name, context, definition) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else {
        context[name] = definition();
    }
}('webStorage', this, function () {
    'use strict';

    // UTILITY FUNCTIONS
    /* -------------------------------------------------------------------- */

    function _str_sub(str, n) {
        if (typeof n === 'number') {
            return n >= 0 ? str.substr(0, n) : str.substr(str.length + n, -n);
        }
        return str;
    }

    function _str_trim(str) {
        return String.prototype.trim ? str.trim() : str.replace(/(^\s*|\s*$)/g, '');
    }

    function _str_removePrefix(str, prefix) {
        return str.indexOf(prefix) === 0 ? str.slice(prefix.length) : str;
    }

    function _obj_extend() {
        for (var i = 1, l = arguments.length; i < l; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
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

    // HELPER FUNCTIONS
    /* -------------------------------------------------------------------- */

    /**
     * Helper function to check if Web Storage is supported.
     * @param {Object} storageType The type of the offline storage (localStorage || sessionStorage).
     * @return {Boolean} Returns true if supported else returns false.
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
     * Helper function that creates the storage key's prefix.
     * @param {Object} instance The WebStorage instance.
     * @return {String} Returns the keys's prefix.
     */
    function _createKeyPrefix(instance) {
        return instance.options.name + '/';
    }

    /**
     * Helper function that checks if a key belongs to a database.
     * Check is done using the keys' prefix.
     * @param {Object} instance The WebStorage instance.
     * @param {String} key The key to check if belongs to a database.
     * @return {Boolean} Returns true if key belongs to a database else returns false.
     */
    function _keyBelongsToDB(instance, key) {
        var storeKeyPrefix = instance.storeKeyPrefix;
        var storeKeyPrefixLen = storeKeyPrefix.length;
        return storeKeyPrefix === _str_sub(key, storeKeyPrefixLen);
    }

    /**
     * Helper function that iterates over storage keys.
     * Early exit by returning false inside iterator callback.
     * @param {Object} instance The WebStorage instance.
     * @param {Function} callabck A function to be executed for each iteration.
     */
    function _iterateStorage(instance, callback) {
        var driver = instance.options.driver,
            iterationNumber = 0,
            key;

        for (key in driver) {
            if (driver.hasOwnProperty(key)) {
                if (_keyBelongsToDB(instance, key)) {
                    if (callback(key, driver[key], ++iterationNumber) === false) {
                        return false;
                    }
                }
            }
        }
    }

    // PUBLIC API
    /* -------------------------------------------------------------------- */

    var proto;
    var defaultConfig = {
        driver: localStorage,
        name: 'webStorage'
    };

    /**
     * Creates a new instance of WebStorage.
     * @constructor
     * @param {Object} options Object that contains config options to extend defaults.
     */
    function WebStorage(options) {
        options = _obj_extend({}, defaultConfig, options);

        if (!_isStorageSupported(options.driver)) {
            throw new Error('Web Storage is not supported by your browser.');
        }

        if (options.name == null || _str_trim(options.name) === '') { // jshint ignore: line
            throw 'You must use a valid name for the database.';
        }

        this.options = options;
        this.storeKeyPrefix = _createKeyPrefix(this);
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
     * @this {WebStorage}
     * @param {Object} options Object that contains config options to extend defaults.
     */
    proto.config = function (options) {
        options = _obj_extend({}, defaultConfig, options);
        if (options.name == null || _str_trim(options.name) === '') { // jshint ignore: line
            throw 'You must use a valid name for the database.';
        }
        this.options = options;
        this.storeKeyPrefix = _createKeyPrefix(this);
    };

    /**
     * Gets a saved item from localStorage or sessionStorage by its key.
     * @this {WebStorage}
     * @param {String} key The property name of the item to save.
     * @return {*} Returns the saved item.
     */
    proto.getItem = function (key) {
        var item = this.options.driver.getItem(this.storeKeyPrefix + key);
        try {
            return JSON.parse(item);
        } catch (error) {
            throw error;
        }
    };

    /**
     * Saves an item to localStorage or sessionStorage.
     * @this {WebStorage}
     * @param {String} key The property name of teh item to save.
     * @param {*} value The item to save to storage.
     * @return {*} Returns the saved item's value if save successful else throws error.
     */
    proto.setItem = function (key, value) {
        var self = this;
        try {
            value = value == null ? null : value; // jshint ignore: line
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
     * @this {WebStorage}
     * @param {String} key The property name of the item to remove.
     */
    proto.removeItem = function (key) {
        this.options.driver.removeItem(this.storeKeyPrefix + key);
    };

    /**
     * Removes all saved items from localStorage or sessionStorage.
     * @this {WebStorage}
     * @param {Boolean} clearAll If true, will clear all items from local(session)Storage, else will clear only the items saved by the instance created.
     * NOTE: The above applies only in cases that a new instance is created and the "name" is set.
     * This is because the only way to tell if an item is saved by an instance is the prefix of the key which is the "name" property.
     * If a new instance is created but does not have "name" set, then .clear() will clear all items from the driver set.
     */
    proto.clear = function (clearAll) {
        var driver = this.options.driver;
        if (clearAll === true) {
            driver.clear();
        } else {
            _iterateStorage(this, function (key) {
                driver.removeItem(key);
            });
        }
    };

    /**
     * Gets the list of all keys in the offline storage for a specific database.
     * If "name" property is not set or set to '' (empty string), returns all keys in storage.
     * @this {WebStorage}
     * @return {Array} An array of all the keys that belong to a specific database.
     */
    proto.keys = function () {
        var keysArr = [],
            storeKeyPrefix = this.storeKeyPrefix;

        _iterateStorage(this, function (key) {
            keysArr.push(_str_removePrefix(key, storeKeyPrefix));
        });
        return keysArr;
    };

    /**
     * Gets the number of keys in the datastore.
     * @this {WebStorage}
     * @return {Number} The number of keys in the datastore.
     */
    proto.length = function () {
        var counter = 0;
        _iterateStorage(this, function () {
            counter += 1;
        });
        return counter;
    };

    /**
     * Iterate over all value/key pairs in datastore.
     * @this {WebStorage}
     * @param {Function} callback A callabck function to execute for each iteration.
     */
    proto.iterate = function (callback) {
        var storeKeyPrefix = this.storeKeyPrefix;

        _iterateStorage(this, function (key, value, iterationNumber) {
            if (callback && callback(_str_removePrefix(key, storeKeyPrefix), value, iterationNumber) === false) {
                return false;
            }
        });
    };

    /**
     * Checks if the driver of choice (localStorage || sessionStorage) is supported.
     * @this {WebStorage}
     * @return {Boolean} Returns true if Web Storage is supported else returns false.
     */
    proto.supported = function () {
        return _isStorageSupported(this.options.driver);
    };

    /* Return a new instance of WebStorage */
    return new WebStorage();
}));
