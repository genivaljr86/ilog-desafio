(function () {
    'use strict';
    angular.module('app').controller('StudentIndexCtrl', StudentIndexCtrl);

    StudentIndexCtrl.$inject = [
        'StudentService',
        '$scope',
        '$http'
    ];

    function StudentIndexCtrl(
        StudentService,
        $scope,
        $http
    ) {
        var vm = this;

        vm.$onInit = function () {
            $scope.loading = true;
            $http({
                method: 'GET',
                url: 'http://localhost:3004/students'
            })
                .then(function (response) {
                    console.log('response', response);
                    $scope.students = response.data;
                    console.log('$scope.students', $scope.students);

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
