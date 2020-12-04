(function () {
    'use strict';
    angular.module('app').factory('CourseService', ['$http', function($http) {
        return {
            'get': function (id) {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:3004/courses/' + id
                })
            },
            'query': function(){
                return $http({
                    method: 'GET',
                    url: 'http://localhost:3004/courses'
                });
            },
            'update': function (data) {
                return $http({
                    method: 'PUT',
                    url: 'http://localhost:3004/courses/' + data.id,
                    data: data
                })
            },
            'insert': function (data) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3004/courses/',
                    data: data
                })
            }
        }
    }]);

})();