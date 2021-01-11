## [DEPRECATED] This is no longer supported, please consider using [WebStorage](https://github.com/georapbox/web-storage) instead.

# webStorage

A minimal Javascript library that improves the way you work with `localStorage` or `sessionStorage`.

[![Build Status](https://travis-ci.org/georapbox/webStorage.svg?branch=master)](https://travis-ci.org/georapbox/webStorage)
[![npm version](https://badge.fury.io/js/webStorage.svg)](http://badge.fury.io/js/webStorage)
[![npm downloads](https://img.shields.io/npm/dt/webStorage.svg)](http://badge.fury.io/js/webStorage)
[![npm license](https://img.shields.io/npm/l/webStorage.svg)](http://badge.fury.io/js/webStorage)
[![Code Climate](https://codeclimate.com/github/georapbox/webStorage/badges/gpa.svg)](https://codeclimate.com/github/georapbox/webStorage)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Dependencies](https://david-dm.org/georapbox/webStorage.svg?theme=shields.io)](https://david-dm.org/georapbox/webStorage)
[![devDependency Status](https://david-dm.org/georapbox/webStorage/dev-status.svg)](https://david-dm.org/georapbox/webStorage#info=devDependencies)


## Install

### npm

```bash
$ npm install webStorage
```

### Git

```bash
$ git clone https://github.com/georapbox/webStorage.git
```

## A few words...

The purpose of this library is to allow the user to manipulate data to `localStorage` or `sessionStorage` accordingly using a namespace (default is "webStorage") as a prefix for each item's key. This is by design in order to avoid potential conflicts with other key/value pairs that are probably already saved to storage. So, for example, if the database name we provided is `myApp`, calling `clear()` will remove only the items with key prefix `myApp`. The same principle applies to all available API methods of the library.

## API methods

### config([options]) => WebStorage

Set and persist webStorage options. This must be called before any other calls to webStorage are made.

**Kind:** instance method of `WebStorage`  
**Throws:** `TypeError` if `options.name` is not a string or empty string.  
**Throws:** `TypeError` if `options.keySeparator` is not a string or empty string.  
**Returns:** `WebStorage` - The WebStorage instance for chaining.

The following options can be set:

|Option|Type|Description|Default value|
|------|----|-----------|-------------|
|**driver**|`Object`|The preferred driver to use. Use one between `localStorage` and `sessionStorage`.|`localStorage`|
|**name**|`String`|The name of the database. This is used as prefix for all keys stored in the offline storage.|`webStorage`|
|**keySeparator**|`String`|String that separates database name and key.|`/`|

### createInstance([options]) => WebStorage

Creates a new instance of the webStorage. The `options` can be the same as `config(options)`.  

**Kind:** instance method of `WebStorage`  
**Throws:** `TypeError` if `options.name` is not a string or empty string.  
**Throws:** `TypeError` if `options.keySeparator` is not a string or empty string.  
**Returns:** `WebStorage` - The WebStorage instance for chaining.

### getItem(key) => *

Gets a saved item from storage by its key.

**Kind:** instance method of `WebStorage`  
**Returns:** `*` - The value of the saved item. If the `key` does not exist, will return `null`.

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|key|`String`||The property name of the saved item|

### setItem(key, [value]) => WebStorage

Saves an item to storage. You can store the following types of JavaScript objects:

- String
- Number
- Array
- Object

**Kind:** instance method of `WebStorage`  
**Returns:** `WebStorage` - The WebStorage instance for chaining.

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|key|`String`||The property name of the item to save|
|[value]|`*`|`null`|The item to save to the selected storage.|

### removeItem(key) => WebStorage

Removes the item for the specific key from the storage.

**Kind:** instance method of `WebStorage`  
**Returns:** `WebStorage` - The WebStorage instance for chaining.

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|key|`String`||The property name of the item to remove|

### clear() => WebStorage

Removes all saved items from storage.

**Kind:** instance method of `WebStorage`  
**Returns:** `WebStorage` - The WebStorage instance for chaining.

### keys() => Array

Gets the list of all keys in the storage for a specific database.

**Kind:** instance method of `WebStorage`  
**Returns:** `Array` - An array of all the keys that belong to a specific database.

### length() => Number

Gets the number of items saved in a specific database.

**Kind:** instance method of `WebStorage`  
**Returns:** `Number` - The number of items for a specific database.

### iterate(iteratorCallback) => WebStorage

Iterate over all value/key pairs in datastore.

**Kind:** instance method of `WebStorage`  
**Returns:** `WebStorage` - The WebStorage instance for chaining.

|Param|Type|Default|Description|
|-----|----|-------|-----------|
|iteratorCallback|`Function`||A callabck function to be executed for each iteration|

`iteratorCallback` is called once for each pair, with the following arguments:

|Param|Type|Description|
|-----|----|-----------|
|key|`String`|The key of the saved item.|
|value|`*`|The value of the saved item.|

### quota() => Object

Display (approximately) the size for each saved item in datastore and the total size of all items in MB.

**Kind:** instance method of `WebStorage`  
**Returns:** `Object<string,number>` - An object with two properties that display the size for each saved item and the total size in MB.

### supported() => Boolean

Checks if the driver of choice (`localStorage` or `sessionStorage`) is supported by the browser. It may return `false` if storage is full.

**Kind:** instance method of `WebStorage`  
**Returns:** `Boolean` - True if driver is supported; otherwise false.

## Usage Example

```js
const users = [
  {id: 1, name: 'John Doe', email: 'johndoe@gmail.com'},
  {id: 2, name: 'George Cooper', email: 'gcooper@outlook.com'},
  {id: 2, name: 'Tim Smith', email: 'smith_t@yahoo.com'}
];

const companies = ['Google', 'Yahoo', 'Microsoft', 'Mozilla'];

/* Saving some items with the default configuration */
webStorage
  .setItem('user', users[0]);
  .setItem('company', companies[0]);

/* Create a new instance and save some items */
const ls = webStorage.createInstance({
  name: 'MyApp'
});

ls
  .setItem('user', users[1]);
  .setItem('company', companies[2]);
  .setItem('dummyKey', 100);

/* Retrieving saved items */
webStorage.getItem('user'); // -> Object { id: 1, name: "John Doe", email: "johndoe@gmail.com" }
webStorage.getItem('company'); // -> "Google"

ls.getItem('user'); // -> Object { id: 2, name: "George Cooper", email: "gcooper@outlook.com" }
ls.getItem('company'); // -> "Microsoft"

/* Get length of datastores */
webStorage.length(); // -> 2
ls.length(); // -> 3

/* Get datastores' keys */
webStorage.keys(); // -> Array [ "company", "user" ]
ls.keys(); // -> Array [ "dummyKey", "company", "user" ]

/* Itereate over datastores */
ls.iterate(function (key, value) {
  console.log(key, ':', value);
});
// -> dummyKey : 100
// -> company : Microsoft
// -> user : Object { id: 2, name: "George Cooper", email: "gcooper@outlook.com" }

/* Quota */
ls.quota();
// -> Object { "total": 0.0001430511474609375, "items": { "MyApp/dummyKey": 0.0000057220458984375, "MyApp/company": 0.0000209808349609375, "MyApp/user": 0.0001163482666015625 } }"

/* Removing items */
webStorage.removeItem('user');
webStorage.length(); // -> 1
webStorage.keys(); // -> Array [ "company" ]
ls.length(); // -> 3 (still same as before)
ls.clear(); /* Clear only the "MyApp" datastore */
ls.length(); // -> 0
ls.keys(); // -> Array []
```

## Events

webStorage instances emit custom events the user can subscribe on:

- `setItem`: When an item is saved in storage.
- `setItemError`: When there is an error saving item to storage.
- `getItem`: When an item is retrieved from storage.
- `getItemError`: When there is an error retrieving an item from storage.
- `removeItem`: When an item is removed from storage.
- `removeItemError`: When there is an error removing an item from storage.
- `clear`: When all items from a database are removed.

### Example

```js
const ls = webStorage.createInstance({
  name: 'MyApp'
});

function onItemSave(event) {
  // ...do something with event
}

// Subscribe to setItem event
ls.addEventListener('setItem', onItemSave);

// Unsubscribe to setItem event
ls.removeEventListener('setItem', onItemSave);

// Check if the target object has a listener registered on for specific event type
ls.hasEventListener('setItem', onItemSave);
```

## Build for development

```bash
$ npm run dev
```

## Build for production

```bash
$ npm run build
```

## Test

```bash
$ npm test
```

## Changelog

For API updates and breaking changes, check the [CHANGELOG](https://github.com/georapbox/webStorage/blob/master/CHANGELOG.md).

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2016)
