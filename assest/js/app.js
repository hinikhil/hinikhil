'use strict';
var app = angular.module('MyApp', ['ui.router'])


app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    //$httpProvider.interceptors.push('httpModifier');
    $stateProvider
    .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        templateUrl: 'templates/login.html'
    })
    .state('signup', {
        url: '/signup',
        controller: 'signupCtrl as si',
        templateUrl: 'templates/signup.html'
    })
    .state('info', {
        url: '/info',
        controller: 'infoCtrl as info',
        templateUrl: 'templates/info.html'
    }) 
    .state('successlogin', {
        url: '/success',
        controller: 'successLoginCtrl as sl',
        templateUrl: 'templates/successLogin.html'
    }) 
    .state('getUserList', {
        url: '/getUserList',
        controller: 'getuserlistCtrl',
        templateUrl: 'templates/getuser.html'
    }) 

    .state('forgetpassword', {
        url: '/forgetpassword',
        controller: 'forgetpasswordCtrl',
        templateUrl: 'templates/forgetpassword.html'
    }) 
    .state('updatePwd', {
        url: '/getUserList',
        controller: 'updatePwdCtrl',
        templateUrl: 'templates/updatePwd.html'
    }) 

     .state('editDetails', {
        url: '/editDetails/:firstName',
        controller: 'editDetailsCtrl',
        templateUrl: 'templates/editDetails.html'
    })



    $urlRouterProvider.otherwise('/login');

})


