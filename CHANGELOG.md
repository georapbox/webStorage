# 1.1.0
- Rewrite using ES2015 syntax.
- Do not throw error on initialization if `localStorage` or `sessionStorage` is not supported or unavailable. User can still use the `supported` method to test for.

# 1.0.0
### Features
- Add `quota()` public API method.
- Automate building distributable files in releases.

# 0.5.3
### Features
- Add a "Usage Example" in documentation.

### Bug Fixes
- Use `JSON.parse` to values on each iteration.

# 0.5.2
### Bug Fixes
- Fix issue when trying to save item with `undefined` as value.

# 0.5.1
### Features
- Add `supported()` method to public API, to check if the driver of choice is supported by the browser.

# 0.5.0
### Features
- Add `length()` and `iterate()` public API methods.
- Make database name a required option to easily distinguish between different datastores.
- Remove comments (inline and block) and empty lines from production files.

### Bug Fixes
- Fix issues with creating the keys prefixes from the database name.
