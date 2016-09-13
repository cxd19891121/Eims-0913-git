/**
 * Created by mooner00 on 8/14/2016.
 */



var app = angular.module('myApp', ['ngRoute','ngAnimate','ui.bootstrap','ngSanitize']);
app.config(function($routeProvider){
    $routeProvider
        .when('/show',{
            controller:'appController as vm',
            templateUrl:"./app/partial/show.html"
        })
        .when('/search',{
            templateUrl:'app/partial/search.html',
            controller:'search',
        })
        .when('/',{
            templateUrl:'app/partial/user/search_user.html',
            controller:'search',
        })


})
