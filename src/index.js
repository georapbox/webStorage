import eventDispatcher from 'gr-event-dispatcher';
import removePrefix from './util/remove-prefix';
import trim from './util/trim';
import assign from './util/assign';
import isStorageSupported from './is-storage-supported';
import createKeyPrefix from './create-key-prefix';
import iterateStorage from './iterate-storage';

const dbNameError = 'You must use a valid name for the database.';

/**
 * Default webStorage configuration
 * @private
 * @type {Object}
 */
const defaultConfig = {
  driver: localStorage,
  name: 'webStorage'
};

/**
 * Holds the events names for reference
 * @private
 * @type {Object}
 */
const events = {
  set: 'setItem',
  set_err: 'setItemError',
  get: 'getItem',
  get_err: 'getItemError',
  remove: 'removeItem',
  remove_err: 'removeItemError',
  clear: 'clear'
};

class WebStorage {
  /**
   * WebStorage constructor
   *
   * @constructor
   * @param {Object} [options] Object that contains config options to extend defaults.
   * @throws {Error} If a `options.name` is not a valid non-empty string.
   */
  constructor(options) {
    options = assign({}, defaultConfig, options);

    if (typeof options.name !== 'string' || trim(options.name) === '') {
      throw new Error(dbNameError);
    }

    this.options = options;
    this.storeKeyPrefix = createKeyPrefix(this);
    eventDispatcher.apply(Object.getPrototypeOf(this));
  }

  /**
   * Creates a new instance of WebStorage.
   *
   * @param {Object} options Object that contains config options to extend defaults.
   * @return {WebStorage} A new WebStorage instance.
   */
  createInstance(options) {
    return new WebStorage(options);
  }

  /**
   * Configures the instance of WebStorage with user's options that will extend the defaults.
   *
   * @this {WebStorage}
   * @param {Object} options Object that contains config options to extend defaults.
   * @throws {Error} If a `options.name` is not a valid non-empty string.
   * @return {WebStorage} The WebStorage instance for convenience and chaining.
   */
  config(options) {
    options = assign({}, defaultConfig, options);

    if (typeof options.name !== 'string' || trim(options.name) === '') {
      throw new Error(dbNameError);
    }

    this.options = options;
    this.storeKeyPrefix = createKeyPrefix(this);
    return this;
  }

  /**
   * Gets a saved item from storage by its key.
   *
   * @this {WebStorage}
   * @param {String} key The property name of the item to save.
   * @return {*} Returns the saved item.
   */
  getItem(key) {
    const item = this.options.driver.getItem(this.storeKeyPrefix + key);

    try {
      const _item = JSON.parse(item);
      this.dispatchEvent({type: events.get, data: _item});
      return _item;
    } catch (error) {
      this.dispatchEvent({type: events.get_err, data: error});
    }
  }

  /**
   * Saves an item to storage.
   *
   * @this {WebStorage}
   * @param {String} key The property name of teh item to save.
   * @param {*} value The item to save to the selected storage.
   * @return {WebStorage} The WebStorage instance for convenience and chaining.
   */
  setItem(key, value) {
    try {
      value = value == null ? null : value;
      key = this.storeKeyPrefix + key;
      this.options.driver.setItem(key, JSON.stringify(value));
      this.dispatchEvent({type: events.set, data: value});
    } catch (error) {
      this.dispatchEvent({type: events.set_err, data: error});
    }
    return this;
  }

  /**
   * Removes an item from storage.
   *
   * @this {WebStorage}
   * @param {String} key The property name of the item to remove.
   * @return {WebStorage} The WebStorage instance for convenience and chaining.
   */
  removeItem(key) {
    try {
      this.options.driver.removeItem(this.storeKeyPrefix + key);
      this.dispatchEvent({type: events.remove, data: key});
    } catch (error) {
      this.dispatchEvent({type: events.remove_err, data: key});
    }
    return this;
  }

  /**
   * Removes all saved items from storage.
   *
   * @this {WebStorage}
   * @return {WebStorage} The WebStorage instance for convenience and chaining.
   */
  clear() {
    const driver = this.options.driver;
    iterateStorage(this, driver.removeItem.bind(driver));
    this.dispatchEvent({type: events.clear});
    return this;
  }

  /**
   * Gets the list of all keys in the offline storage for a specific database.
   *
   * @this {WebStorage}
   * @return {Array} An array of all the keys that belong to a specific database.
   */
  keys() {
    const keysArr = [];
    const storeKeyPrefix = this.storeKeyPrefix;
    iterateStorage(this, key => keysArr.push(removePrefix(key, storeKeyPrefix)));
    return keysArr;
  }

  /**
   * Gets the number of keys in the datastore.
   *
   * @this {WebStorage}
   * @return {Number} The number of keys in the datastore.
   */
  length() {
    return this.keys().length;
  }

  /**
   * Iterate over all value/key pairs in datastore.
   *
   * @this {WebStorage}
   * @param {function} iteratorCallback A callabck function to execute for each iteration.
   *        `iteratorCallback` is called once for each pair, with the following arguments:
   *        - {String} key The key of the saved item.
   *        - {*} value The value of the saved item.
   * @return {WebStorage} The WebStorage instance for convenience and chaining.
   */
  iterate(iteratorCallback) {
    const storeKeyPrefix = this.storeKeyPrefix;

    iterateStorage(this, (key, value) => {
      const _key = removePrefix(key, storeKeyPrefix);
      const _value = JSON.parse(value);
      iteratorCallback && iteratorCallback.call(this, _key, _value);
    });

    return this;
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

    iterateStorage(this, (key, value) => {
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
   * It may return `false` if storage is full.
   *
   * @this {WebStorage}
   * @return {Boolean} Returns true if Web Storage is supported; otherwise false.
   */
  supported() {
    return isStorageSupported(this.options.driver);
  }
}

export default new WebStorage();
