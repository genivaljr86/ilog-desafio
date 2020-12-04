(function () {
    'use strict';
    angular.module('app').controller('CourseDetailsCtrl', CourseDetailsCtrl);

    CourseDetailsCtrl.$inject = [
        'StudentService',
        'CourseService',
        '$scope',
        '$state'
    ];

    function CourseDetailsCtrl(
        StudentService,
        CourseService,
        $scope,
        $state
    ) {
        var vm = this;
        const isCreate = !angular.isDefined($state.params.id);

        vm.$onInit = function () {
            vm.loading = true;

            CourseService.get($state.params.id)
                .then(function (response) {
                    $scope.record = response.data;

                })
                .catch(function (response) {
                    //TODO: insert notification
                })
                .finally(function () {
                    $scope.loading = false;
                })

            $scope.submit = function (record) {
                vm.loading = true;

                CourseService[isCreate ? 'insert' : 'update'](record)
                    .then(function (response) {
                        $state.go("course-index")

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
