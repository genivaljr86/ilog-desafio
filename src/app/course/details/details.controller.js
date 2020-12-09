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

        const handleSearchStudents = results => {
            let studentsIds = $scope.record.students.map(s => s.id);
            return _.filter(results, result => !studentsIds.includes(result.id));
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
                        return handleSearchStudents(response.data)
                    })
            }

            $scope.selectStudent = student => {
                $scope.record.students.push(student);
                $scope.studentSelected = "";
            }

            $scope.removeStudent = index => {
                $scope.record.students.splice(index, 1);
            }

            $scope.submit = record => {
                vm.loading = true;

                CourseService[isCreate ? 'insert' : 'update'](record)
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: isCreate ? 'Aluno criado com sucesso!': 'Aluno atualizado com sucesso!',
                            showConfirmButton: true
                          }).then((result) => {
                              $state.go("course-index");
                          });
                    })
                    .catch(response => {
                        alert('ERRO!');
                    })
                    .finally(() => {
                        $scope.loading = false;
                    });
            }

            $scope.remove = id => {
                CourseService.remove($state.params.id)
                    .then(response => {
                        $state.go("course-index");
                    })
            }
        }
    };

})();
