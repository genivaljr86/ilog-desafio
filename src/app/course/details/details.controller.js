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
            "studentsIds": []
        }

        const handleStudentSelecteds = function(students){
            return students.map(function(student){
                return student.id
            })
        }

        vm.$onInit = function () {
            vm.loading = true;

            $scope.selectedStudents = [];

            $q.all({
                course: CourseService.get($state.params.id) || [],
                students: StudentService.query()
            })
            .then(function (responses) {
                $scope.record = isCreate ? record : responses.course.data;
                $scope.students = responses.students.data;
                /**
                 * @todo Refactor with Lodash
                 */
                // $scope.selectedStudents = $scope.record.studentsIds.map(function(row){
                //     angular.forEach($scope.students, function(student){
                //         if(student.id == row){
                //             row = student;
                //         }
                //     })
                //     return row;
                // })
                

            })
            .catch(function (response) {
                //TODO: insert notification
            })
            .finally(function () {
                $scope.loading = false;
            });

            $scope.insertStudent = function(student){
                $scope.record.students.push(student);
            }

            $scope.removeStudent = function(index){
                $scope.record.students.splice(index,1);
            }

            $scope.submit = function (record) {
                vm.loading = true;

                // record.studentsIds = handleStudentSelecteds($scope.selectedStudents);

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
