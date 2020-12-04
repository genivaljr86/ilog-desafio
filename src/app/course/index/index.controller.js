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
                .then(function (response) {
                    console.log('response', response);
                    $scope.courses = response.data;
                    console.log('$scope.courses', $scope.courses);

                })
                .catch(function (response) {
                    //TODO: insert notification
                })
                .finally(function () {
                    $scope.loading = false;

                })
        }

    };

})();
