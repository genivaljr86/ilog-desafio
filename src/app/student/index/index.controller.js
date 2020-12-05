(function () {
    'use strict';
    angular.module('app').controller('StudentIndexCtrl', StudentIndexCtrl);

    StudentIndexCtrl.$inject = [
        'StudentService',
        '$scope'
    ];

    function StudentIndexCtrl(
        StudentService,
        $scope
    ) {
        var vm = this;

        vm.$onInit = function () {
            $scope.loading = true;
            StudentService.query()
                .then(response => {
                    $scope.students = angular.copy(response.data);
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
