(function () {
    'use strict';
    angular.module('app').controller('StudentDetailsCtrl', StudentDetailsCtrl);

    StudentDetailsCtrl.$inject = [
        'StudentService',
        '$scope',
        '$state',
        '$q',
        '$http',
    ];

    function StudentDetailsCtrl(
        StudentService,
        $scope,
        $state,
        $q,
        $http,
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

        const handleAddress = address => {
            return _.values(_.pick(address, ['road', 'suburb', 'city', 'state'])).join(", ")
        }

        vm.$onInit = function () {

            vm.loading = true;

            $scope.modelOptions = {
                debounce: {
                    default: 500,
                    blur: 250
                },
                getterSetter: true
            };

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

            $scope.searchAddress = query => {
                return $http.get('https://nominatim.openstreetmap.org/search.php?q=' + query + '&format=jsonv2&addressdetails=1')
                    .then(function (response) {
                        return response.data.map(function (item) {
                            return handleAddress(item.address)
                        });
                    });
            };
            $scope.submit = (record) => {
                vm.loading = true;

                StudentService[isCreate ? 'insert' : 'update'](record)
                    .then(response => {
                        $state.go("student-index");

                    })
                    .catch(response => {
                        alert(response.message);
                    })
                    .finally(() => {
                        $scope.loading = false;
                    });
            }

            $scope.remove = id => {
                $scope.loading = true;

                StudentService.remove($state.params.id)
                    .then(response => {
                        $state.go("student-index");
                    })
                    .finally(() => {
                        $scope.loading = false;
                    })
            }


        }

    };

})();
