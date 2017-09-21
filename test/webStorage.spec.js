/* global webStorage */
/* eslint-env jasmine */

describe('webStorage', function () {
  /* Save and eetrieve items */
  it('Should succesfully save and retrieve values to localStorage', function () {
    localStorage.clear();
    webStorage.setItem('local.obj', {foo: 'bar'});
    webStorage.setItem('local.str', 'bar');
    expect(webStorage.getItem('local.obj').foo).toEqual('bar');
    expect(webStorage.getItem('local.str')).toEqual('bar');
    localStorage.clear();
  });

  /* Remove item */
  it('Should remove a saved item by its key', function () {
    localStorage.clear();
    webStorage.setItem('local.str', 'bar');
    webStorage.removeItem('local.str');
    expect(webStorage.getItem('local.str')).toEqual(null);
  });

  /* Clear */
  it('Should clear all keys from a specific databse', function () {
    localStorage.clear();

    webStorage.setItem('1', 'Item 1');
    webStorage.setItem('2', 'Item 2');

    const ls = webStorage.createInstance({name: 'MyApp'});

    ls.setItem('1', 'Item 1');
    ls.setItem('2', 'Item 2');
    ls.setItem('3', 'Item 3');
    ls.clear();

    expect(webStorage.length()).toEqual(2);
    expect(ls.length()).toEqual(0);
  });

  /* New Instance */
  it('Should create a new instance with configured options', function () {
    localStorage.clear();

    const ls = webStorage.createInstance({
      driver: sessionStorage,
      name: 'MyApp'
    });

    expect(ls.storeKeyPrefix).toEqual('MyApp/');
  });

  /* Iterate */
  it('Should iterate over all value/key pairs in datastore', function () {
    localStorage.clear();

    webStorage.setItem('1', 'Item 1');
    webStorage.setItem('2', 'Item 2');
    webStorage.setItem('3', 'Item 3');
    webStorage.setItem('4', 'Item 4');
    webStorage.setItem('5', 'Item 5');

    // Create another instance to test that iterator only works for specific instance database.
    const ls = webStorage.createInstance({
      driver: sessionStorage,
      name: 'TestApp'
    });
    ls.setItem('test1', 'Item 1');
    ls.setItem('test2', 'Item 2');

    const valuesArr = [];

    webStorage.iterate(function (key, value) {
      valuesArr.push(value);
    });

    expect(valuesArr.length).toEqual(5);
  });
});
