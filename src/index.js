import removePrefix from './util/remove-prefix';
import trim from './util/trim';
import extend from './util/extend';
import isStorageSupported from './is-storage-supported';
import createKeyPrefix from './create-key-prefix';
import iterateStorage from './iterate-storage';

/**
 * Default webStorage configuration
 * @private
 * @type {Object}
 */
const defaultConfig = {
  driver: localStorage,
  name: 'webStorage'
};

class WebStorage {
  /**
   * WebStorage constructor
   *
   * @constructor
   * @param {Object} [options] Object that contains config options to extend defaults.
   */
  constructor(options) {
    options = extend({}, defaultConfig, options);

    if (options.name == null || trim(options.name) === '') {
      throw 'You must use a valid name for the database.';
    }

    this.options = options;
    this.storeKeyPrefix = createKeyPrefix(this);
  }

  /**
   * Creates a new instance of WebStorage.
   *
   * @param {Object} options Object that contains config options to extend defaults.
   * @return {Object} The WebStorage new instance.
   */
  createInstance(options) {
    return new WebStorage(options);
  }

  /**
   * Configures the instance of WebStorage with user's options that will extend the defaults.
   *
   * @this {WebStorage}
   * @param {Object} options Object that contains config options to extend defaults.
   * @return {undefined}
   */
  config(options) {
    options = extend({}, defaultConfig, options);
    if (options.name == null || trim(options.name) === '') {
      throw 'You must use a valid name for the database.';
    }
    this.options = options;
    this.storeKeyPrefix = createKeyPrefix(this);
  }

  /**
   * Gets a saved item from localStorage or sessionStorage by its key.
   *
   * @this {WebStorage}
   * @param {String} key The property name of the item to save.
   * @return {*} Returns the saved item.
   */
  getItem(key) {
    const item = this.options.driver.getItem(this.storeKeyPrefix + key);

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
  setItem(key, value) {
    const that = this;

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
  removeItem(key) {
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
  clear(clearAll) {
    const driver = this.options.driver;

    if (clearAll === true) {
      driver.clear();
    } else {
      iterateStorage(this, function (key) {
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
  keys() {
    const keysArr = [];
    const storeKeyPrefix = this.storeKeyPrefix;

    iterateStorage(this, function (key) {
      keysArr.push(removePrefix(key, storeKeyPrefix));
    });

    return keysArr;
  }

  /**
   * Gets the number of keys in the datastore.
   *
   * @this {WebStorage}
   * @return {Number} The number of keys in the datastore.
   */
  length() {
    let counter = 0;

    iterateStorage(this, function () {
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
  iterate(callback) {
    const storeKeyPrefix = this.storeKeyPrefix;

    iterateStorage(this, function (key, value, iterationNumber) {
      const _key = removePrefix(key, storeKeyPrefix);
      const _value = JSON.parse(value);

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
  quota() {
    const items = {};
    let totalSize = 0;

    iterateStorage(this, function (key, value) {
      const itemSize = value.length * 2 / 1024 / 1024;
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
  supported() {
    return isStorageSupported(this.options.driver);
  }
}

export default new WebStorage();
