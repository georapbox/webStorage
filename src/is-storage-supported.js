/**
 * Helper function to check if Web Storage is supported.
 *
 * @param {Object} storageType The type of the offline storage (localStorage || sessionStorage).
 * @return {Boolean} Returns true if supported else returns false.
 */
function isStorageSupported(storageType) {
  const dummy = 'storage.dummy';

  try {
    storageType.setItem(dummy, dummy);
    storageType.removeItem(dummy);
    return true;
  } catch (error) {
    return false;
  }
}

export default isStorageSupported;
