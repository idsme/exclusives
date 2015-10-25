/* jshint -W117, -W030 */
describe('rentals routes', function () {
    describe('state', function () {
        var view = 'app/rentals/rentals.html';

        beforeEach(function() {
            module('app.rentals', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state rentals to url / ', function() {
            expect($state.href('rentals', {})).to.equal('/');
        });

        it('should map /rentals route to rentals View template', function () {
            expect($state.get('rentals').templateUrl).to.equal(view);
        });

        it('of rentals should work with $state.go', function () {
            $state.go('rentals');
            $rootScope.$apply();
            expect($state.is('rentals'));
        });
    });
});
