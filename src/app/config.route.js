(function () {
    'use strict';

    angular.module('app')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function (
                $stateProvider,
                $urlRouterProvider
            ) {

                $urlRouterProvider.when('/', '/student');

                $stateProvider.state({
                    name: 'student-index',
                    url: '/student',
                    templateUrl: 'student/index/index.html',
                    controller: 'StudentIndexCtrl'
                });

                $stateProvider.state({
                    name: 'student-details',
                    url: '/student/details/:id',
                    templateUrl: 'student/details/details.html',
                    controller: 'StudentDetailsCtrl'
                });

                $stateProvider.state({
                    name: 'student-add',
                    url: '/student/details',
                    templateUrl: 'student/details/details.html',
                    controller: 'StudentDetailsCtrl'
                });

                $stateProvider.state({
                    name: 'course-index',
                    url: '/course',
                    templateUrl: 'course/index/index.html',
                    controller: 'CourseIndexCtrl'
                });

                $stateProvider.state({
                    name: 'course-details',
                    url: '/course/details/:id',
                    templateUrl: 'course/details/details.html',
                    controller: 'CourseDetailsCtrl'
                });

                $stateProvider.state({
                    name: 'course-add',
                    url: '/course/details',
                    templateUrl: 'course/details/details.html',
                    controller: 'CourseDetailsCtrl'
                });

                // $routeProvider
                //     .when('/', {redirectTo: '/signin'})
                //     .when('/dashboard', {templateUrl: 'dashboard/dashboard.html', controller: 'DashboardCtrl'})
                //     .when('/signin', {templateUrl: 'auth/signin.html', controller: 'AuthCtrl'})
                //     .when('/forgot-password', {templateUrl: 'auth/forgot-password.html', controller: 'AuthCtrl'})
                //     .when('/signup', {templateUrl: 'auth/signup.html', controller: 'AuthCtrl'})
                //     .when('/404', {templateUrl: 'shared/404.html'})
                //     .when('/student', {templateUrl: 'student/index/index.html', controller: 'StudentIndexCtrl'})
                //     .otherwise({ redirectTo: '/404'});

            }]
        );

})(); 