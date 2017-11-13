# 2.1.1
- [[#3](https://github.com/georapbox/webStorage/issues/3)] Fix issue with `config` method that would not merge properly new options with the instance's options.

# 2.1.0
- [[#2](https://github.com/georapbox/webStorage/issues/2)] Ability to configure the separator between database name and key via `keySeparator` option.

# 2.0.0
## Breaking changes
- `clear` method no longer supports `clearAll` argument that used to flush everything in storage no matter the database name. If you need to do that use the native API of `Storage`, eg. `localStorage.clear()`
- `setItem`, `getItem` and `removeItem` methods no longer throw errors explicitly. You can still catch any errors registering on the following events: `setItemError`, `getItemError` and `removeItemError` respectively.
- `iteratorCallback` function no longer accepts `iterationNumber` as a third argument.

## Other updates
- `removeItemError` event is now emitted if there is an error while removing an item from storage.
- `config`, `setItem`, `removeItem`, `clear` and `iterate` methods now return an instance reference for chaining purposes.
- Keep devDependencies up to date.

# 1.2.4
- Keep dependencies up to date
- eslint loader for webpack

# 1.2.3
- Change the way to update dependancies using the caret `^` strategy

# 1.2.2
- Update ESLint rules
- Add codeclimate configuration

# 1.2.1
- Fix bug that caused custom events not to emit when using the default instance of webStorage
- Keep devDependancies up to date

# 1.2.0
- Emit custom events on specific operations

# 1.1.0
- Rewrite using ES2015 syntax
- Do not throw error on initialization if `localStorage` or `sessionStorage` is not supported or unavailable. User can still use the `supported` method to test for

# 1.0.0
### Features
- Add `quota()` public API method
- Automate building distributable files in releases

# 0.5.3
### Features
- Add a "Usage Example" in documentation

### Bug Fixes
- Use `JSON.parse` to values on each iteration

# 0.5.2
### Bug Fixes
- Fix issue when trying to save item with `undefined` as value

# 0.5.1
### Features
- Add `supported()` method to public API, to check if the driver of choice is supported by the browser

# 0.5.0
### Features
- Add `length()` and `iterate()` public API methods
- Make database name a required option to easily distinguish between different data stores
- Remove comments (inline and block) and empty lines from production files

### Bug Fixes
- Fix issues with creating the keys prefixes from the database name
