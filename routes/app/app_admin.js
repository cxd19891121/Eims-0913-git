/**
 * Created by mooner00 on 8/14/2016.
 */



var app = angular.module('myApp', ['ngRoute','ngAnimate','ui.bootstrap','ngSanitize']);
app.config(function($routeProvider){
    $routeProvider
        .when("/test",{
            controller:'userCtrl as vm',
            templateUrl:'./app/partial/myTest.html'
        })
        .when('/show',{
            controller:'appController as vm',
            templateUrl:"./app/partial/show.html"
        })
        .when('/edit/:id',{
            templateUrl:'./app/partial/edit.html',
            controller:'editController as vm'
        })
        .when('/add',{
            templateUrl:'app/partial/add.html',
            controller:'addCtrl as vm'
        })
        .when('/search',{
            templateUrl:'app/partial/search.html',
            controller:'search',
        })
        .when('/addTest/in',{
            templateUrl:'app/partial/addDetails.html',
            controller:'add',
        })
        .when('/',{
            templateUrl:'app/partial/admin/search_admin.html',
            controller:'search',
        })
        .when('/config',{
            templateUrl:'app/partial/admin/modify.html'
        })
        .when('/userConfig',{
            templateUrl:'app/partial/admin/userConfig.html'
        })



})
