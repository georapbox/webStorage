import keyBelongsToDB from './key-belongs-to-db';

/**
 * Helper function that iterates over storage keys.
 * Early exit by returning false inside iterator callback.
 *
 * @param {Object} instance The WebStorage instance.
 * @param {function} callback A function to be executed for each iteration.
 * @return {undefined}
 */
function iterateStorage(instance, callback) {
  const driver = instance.options.driver;
  let iterationNumber = 0;

  Object.keys(driver).forEach(function (key) {
    if (keyBelongsToDB(instance, key)) {
      if (callback(key, driver[key], ++iterationNumber) === false) {
        return false;
      }
    }
  });
}

export default iterateStorage;
