(function () {
    'use strict';

    describe('webStorage', function () {
        /* Save and eetrieve items */
        it('Should succesfully save and retrieve values to localStorage', function () {
            webStorage.setItem('local.obj', {
                foo: 'bar'
            });
            webStorage.setItem('local.str', 'bar');
            expect(webStorage.getItem('local.obj').foo).toEqual('bar');
            expect(webStorage.getItem('local.str')).toEqual('bar');
            localStorage.clear();
        });

        /* Remove item */
        it('Should remove a saved item by its key', function () {
            webStorage.setItem('local.str', 'bar');
            webStorage.removeItem('local.str');
            expect(webStorage.getItem('local.str')).toEqual(null);
        });

        /* New Instance */
        it('Should create a new instance with configured options', function () {
            var ls = webStorage.createInstance({
                driver: sessionStorage,
                name: 'MyApp'
            });

            expect(ls.storeKeyPrefix).toEqual('MyApp/');
        });
    });
}());
