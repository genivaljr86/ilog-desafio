(function () {
    'use strict';
    angular.module('app').controller('StudentDetailsCtrl', StudentDetailsCtrl);

    StudentDetailsCtrl.$inject = [
        'StudentService',
        '$scope',
        '$state',
        '$q'
    ];

    function StudentDetailsCtrl(
        StudentService,
        $scope,
        $state,
        $q
    ) {
        var vm = this;
        
        const isCreate = !angular.isDefined($state.params.id);

        const record = {
            "id": null,
            "name": "",
            "phone": "",
            "address": "",
            "admission_date": ""

        }

        vm.$onInit = function () {
            vm.loading = true;

            $q
                .all({
                    student: isCreate ? [] : StudentService.get($state.params.id)
                })
                .then(response => {
                    $scope.record = isCreate ? record : angular.copy(response.student.data);

                })
                .catch(response => {
                    //TODO: insert notification
                })
                .finally(() => {
                    $scope.loading = false;
                })

            $scope.submit = (record) => {
                vm.loading = true;

                StudentService[isCreate ? 'insert' : 'update'](record)
                    .then(response => {
                        $state.go("student-index");

                    })
                    .catch(response => {
                        alert('ERRO!');
                    })
                    .finally(() => {
                        $scope.loading = false;
                    });
            }
        }

    };

})();
