(function () {
    'use strict';
    angular.module('app').controller('StudentDetailsCtrl', StudentDetailsCtrl);

    StudentDetailsCtrl.$inject = [
        'StudentService',
        '$scope',
        '$state'
    ];

    function StudentDetailsCtrl(
        StudentService,
        $scope,
        $state
    ) {
        var vm = this;
        const isCreate = !angular.isDefined($state.params.id);

        vm.$onInit = function () {
            vm.loading = true;


            StudentService.get($state.params.id)
                .then(function (response) {
                    $scope.record = angular.copy(response.data);

                })
                .catch(function (response) {
                    //TODO: insert notification
                })
                .finally(function () {
                    $scope.loading = false;
                })

            $scope.submit = function (record) {
                vm.loading = true;

                StudentService[isCreate ? 'insert' : 'update'](record)
                    .then(function (response) {
                        $state.go("student-index")

                    })
                    .catch(function (response) {
                        alert('ERRO!')
                    })
                    .finally(function () {
                        $scope.loading = false;
                    })
            }
        }

    };

})();
