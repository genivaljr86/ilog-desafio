(function () {
    'use strict';
    angular.module('app').controller('CourseIndexCtrl', CourseIndexCtrl);

    CourseIndexCtrl.$inject = [
        'CourseService',
        '$scope'
    ];

    function CourseIndexCtrl(
        CourseService,
        $scope
    ) {
        var vm = this;

        vm.$onInit = function () {
            $scope.loading = true;
            CourseService.query()
                .then(response => {
                    $scope.courses = angular.copy(response.data);

                })
                .catch(response => {
                    //TODO: insert notification
                })
                .finally(() => {
                    $scope.loading = false;

                })
        }

    };

})();
