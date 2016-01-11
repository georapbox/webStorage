[![Build Status](https://travis-ci.org/georapbox/webStorage.svg?branch=master)](https://travis-ci.org/georapbox/webStorage) [![Dependencies](https://david-dm.org/georapbox/webStorage.svg?theme=shields.io)](https://david-dm.org/georapbox/webStorage) [![devDependency Status](https://david-dm.org/georapbox/webStorage/dev-status.svg)](https://david-dm.org/georapbox/webStorage#info=devDependencies)

*Distributable files can be found under [releases](https://github.com/georapbox/webStorage/releases).*

# webStorage

webStorage is a minimal Javascript library that improves the way you work with ```localStorage``` or ```sessionStorage```.


## Data API

The API methods below deal with getting and setting data in an offline store.

### getItem

```js
getItem(key)
```

Gets an item from an offline store. If the key does not exist, ```getItem()``` will return null.

### setItem

```js
setItem(key, value)
```

Saves an item to an offline store. You can store the following types of JavaScript objects:

- String
- Number
- Array
- Object

### removeItem

```js
removeItem(key)
```

Removes the value of a key from the offline store.

### clear

```js
clear([clearAll])
```

> Use this method with caution.

If ```clearAll``` is set to ```true```, removes every key from the storage, returning it to a blank slate.

If ```clearAll``` is set to ```false``` or any other falsy value it will remove only the keys that belong to the specific databse.

### keys

```js
keys()
```

Gets the list of all keys in the offline storage for a specific database.

### length

```js
length()
```

Gets the number of keys in the datastore.

### iterate

```js
iterate(iteratorCallback)
```

Iterate over all value/key pairs in datastore.

<code>iteratorCallback</code> is called once for each pair, with the following arguments:

- key
- value
- iterationNumber (one-based number)

You can early exit from iterator by returning ```false``` inside ```iteratorCallback```.

### quota

```js
quota()
```

Display the size for each key in datastore and the total size of all kesy in MB.

### supported

```js
supported()
```

Checks if the driver of choice (<code>localStorage</code> or <code>sessionStorage</code>) is supported by the browser.


## Settings API

### config

```js
config(options)
```

Set and persist webStorage options. This must be called before any other calls to webStorage are made. The following options can be set:

##### driver
> The preferred driver to use. Use one between ```localStorage``` and ```sessionStorage```.<br>
Default: ```localStorage {Object}```

##### name
> The name of the database. This is used as prefix for all keys stored in the offline storage.<br>
Default: ```webStorage {String}```


### createInstance

```js
createInstance([options])
```

Creates a new instance of the webStorage. The ```options``` are the same as ```config(options)```.


## Usage Example

```js
var users = [
    {id: 1, name: 'John Doe', email: 'johndoe@gmail.com'},
    {id: 2, name: 'George Cooper', email: 'gcooper@outlook.com'},
    {id: 2, name: 'Tim Smith', email: 'smith_t@yahoo.com'}
];

var companies = ['Google', 'Yahoo', 'Microsoft', 'Mozilla'];

/* Saving some items with the default configuration */
webStorage.setItem('user', users[0]);
webStorage.setItem('company', companies[0]);

/* Create a new instance and save some items */
var ls = webStorage.createInstance({
    name: 'MyApp'
});

ls.setItem('user', users[1]);
ls.setItem('company', companies[2]);
ls.setItem('dummyKey', 100);

/* Retrieving saved items */
webStorage.getItem('user'); // => Object { id: 1, name: "John Doe", email: "johndoe@gmail.com" }
webStorage.getItem('company'); // => "Google"

ls.getItem('user'); // => Object { id: 2, name: "George Cooper", email: "gcooper@outlook.com" }
ls.getItem('company'); // => "Microsoft"

/* Get length of datastores */
webStorage.length(); // => 2
ls.length(); // => 3

/* Get datastores' keys */
webStorage.keys(); // => Array [ "company", "user" ]
ls.keys(); // => Array [ "dummyKey", "company", "user" ]

/* Itereate over datastores */
ls.iterate(function (key, value, iterNum) {
    console.log(iterNum, ':', key, ':', value);
});
// => 1 : dummyKey : 100
// => 2 : company : Microsoft
// => 3 : user : Object { id: 2, name: "George Cooper", email: "gcooper@outlook.com" }

/* Quota */
ls.quota();
// => Object { "total": 0.0001430511474609375, "items": { "MyApp/dummyKey": 0.0000057220458984375, "MyApp/company": 0.0000209808349609375, "MyApp/user": 0.0001163482666015625 } }"

/* Removing items */
webStorage.removeItem('user');
webStorage.length(); // => 1
webStorage.keys(); // => Array [ "company" ]
ls.length(); // => 3 (still same as before)
ls.clear(); /* Clear only the "MyApp" datastore */
ls.length(); // => 0
ls.keys(); // => Array []
webStorage.length(); // => 1
ls.clear(true); /* Flush away everything in localStorage */
webStorage.length(); // => 0
```


## Build the project

### 1. Install dependancies

```sh
$ cd webStorage
$ npm install
```

### 2. Build

```sh
$ npm run build
```

The command above will create a ```dist/``` folder that contains the library to be used in production. It will also lint the code and run the tests.
