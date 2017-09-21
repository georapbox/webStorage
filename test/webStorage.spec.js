/* global webStorage */
/* eslint-env jasmine */

describe('webStorage', function () {
  it('Should create a new instance', function () {
    const ls = webStorage.createInstance();

    expect(ls.constructor.name).toEqual('WebStorage');
  });

  it('Should create a new instance with a new namespace', function () {
    const ls = webStorage.createInstance({
      name: 'MyApp'
    });

    expect(ls.storeKeyPrefix).toEqual('MyApp/');
  });

  it('Should succesfully save and retrieve values to localStorage', function () {
    localStorage.clear();

    webStorage.setItem('local.obj', {foo: 'bar'});

    webStorage.setItem('local.str', 'bar');

    expect(webStorage.getItem('local.obj').foo).toEqual('bar');

    expect(webStorage.getItem('local.str')).toEqual('bar');
  });

  it('Should remove a saved item by its key', function () {
    localStorage.clear();

    webStorage.setItem('local.str', 'bar');
    webStorage.removeItem('local.str');

    expect(webStorage.getItem('local.str')).toEqual(null);
  });

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

  it('Should iterate over all value/key pairs in datastore', function () {
    localStorage.clear();

    webStorage.setItem('1', 'Item 1');
    webStorage.setItem('2', 'Item 2');
    webStorage.setItem('3', 'Item 3');
    webStorage.setItem('4', 'Item 4');
    webStorage.setItem('5', 'Item 5');

    // Create another instance to test that iterator only works for specific instance database.
    const ls = webStorage.createInstance({
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

  it('Should return the keys of a datastore as an array of strings', function () {
    localStorage.clear();

    const ls = webStorage.createInstance({
      name: 'TestApp'
    });

    ls.setItem('test1', 'Item 1');
    ls.setItem('test2', 'Item 2');
    ls.setItem('test3', 'Item 3');

    const keys = ls.keys();

    expect(keys instanceof Array);
    expect(keys.length).toBe(3);
    expect(keys.indexOf('test1')).toBeGreaterThan(-1);
    expect(keys.indexOf('test2')).toBeGreaterThan(-1);
    expect(keys.indexOf('test3')).toBeGreaterThan(-1);
    expect(keys.indexOf('test4')).toBe(-1);
  });

  it('Should return the length of saved items for a specific database', function () {
    localStorage.clear();

    const ls1 = webStorage.createInstance({
      name: 'App1'
    });

    const ls2 = webStorage.createInstance({
      name: 'App2'
    });

    ls1.setItem('test1', 'Item 1');
    ls1.setItem('test2', 'Item 2');
    ls1.setItem('test3', 'Item 3');

    ls2.setItem('test1', 'Item 1');
    ls2.setItem('test2', 'Item 2');

    expect(ls1.length()).toBe(3);
    expect(ls2.length()).toBe(2);
  });
});
