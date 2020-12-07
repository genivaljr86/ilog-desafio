(function () {
    'use strict';
    angular.module('app').controller('CourseDetailsCtrl', CourseDetailsCtrl);

    CourseDetailsCtrl.$inject = [
        'StudentService',
        'CourseService',
        '$scope',
        '$state',
        '$q'
    ];

    function CourseDetailsCtrl(
        StudentService,
        CourseService,
        $scope,
        $state,
        $q
    ) {
        var vm = this;
        const isCreate = !angular.isDefined($state.params.id);

        let record = {
            "id": null,
            "title": "",
            "description": "",
            "workload": "",
            "value": "",
            "students": []
        }

        vm.$onInit = function () {
            vm.loading = true;

            $scope.selectedStudents = [];

            $scope.modelOptions = {
                debounce: {
                    default: 500,
                    blur: 250
                },
                getterSetter: true
            };

            $q
                .all({
                    course: isCreate ? [] : CourseService.get($state.params.id),
                    students: StudentService.query()
                })
                .then(responses => {
                    $scope.record = isCreate ? record : angular.copy(responses.course.data);
                    $scope.students = responses.students.data;
                })
                .catch(response => {
                    //TODO: insert notification
                })
                .finally(() => {
                    $scope.loading = false;
                });

            $scope.searchStudent = q => {
                return StudentService.query({ name_like: q })
                    .then(response => {
                        return response.data;
                    })
            }

            $scope.insertStudent = student => {
                $scope.record.students.push(student);
            }

            $scope.removeStudent = index => {
                $scope.record.students.splice(index, 1);
            }

            $scope.submit = record => {
                vm.loading = true;

                CourseService[isCreate ? 'insert' : 'update'](record)
                    .then(response => {
                        $state.go("course-index");
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
