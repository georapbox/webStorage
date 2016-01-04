(function () {
    'use strict';

    describe('webStorage.setItem', function () {
        it('should succesfully save values to localStorage', function () {
            webStorage.setItem('local.obj', {
                foo: 'bar'
            });

            webStorage.setItem('local.str', 'bar');

            expect(webStorage.getItem('local.obj').foo).toEqual('bar');
            expect(webStorage.getItem('local.str')).toEqual('bar');

            webStorage.clear();
        });
    });
}());
