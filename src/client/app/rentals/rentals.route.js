(function() {
    'use strict';

    angular
        .module('app.rentals')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
//Bulgersteyn-7321-3011AB-rotterdam.html
    function getStates() {
        return [
            {
                state: 'rentals',
                config: {
                    url: '/',
                    templateUrl: 'app/rentals/rentals.html',
                    controller: 'RentalsController',
                    controllerAs: 'vm',
                    title: 'rentals',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-rentals"></i> Rentals'
                    }
                }
            }
        ];
    }
})();
