# CHANGELOG

## v0.5.x

### 0.5.2
- Fix issue when trying to save item with ```undefined``` as value.

### 0.5.1
- Add ```supported()``` method to public API, to check if the driver of choice is supported by the browser.

### 0.5.0
- Add ```length()``` and ```iterate()``` public API methods.
- Make database name a required option to easily distinguish between different datastores.
- Remove comments (inline and block) and empty lines from production files.
- Fix issues with creating the keys prefixes from the database name.
