(function () {
    'use strict';
    angular.module('app').factory('StudentService', ['$http', function($http) {
        return {
            'get': function (id) {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:3004/students/' + id
                })
            },
            'query': function(params){
                return $http({
                    method: 'GET',
                    params: params,
                    url: 'http://localhost:3004/students'
                });
            },
            'update': function (data) {
                return $http({
                    method: 'PUT',
                    url: 'http://localhost:3004/students/' + data.id,
                    data: data
                })
            },
            'insert': function (data) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3004/students/',
                    data: data
                })
            },
            'remove': function (id) {
                return $http({
                    method: 'DELETE',
                    url: 'http://localhost:3004/students/' + id
                })
            }
        }
    }]);

})();