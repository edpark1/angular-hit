'use strict';

// Defining Angular app model with all other dependent modules
var homesInternalToolsApp = angular.module('homesInternalToolsApp',['ngRoute',
	'homesInternalToolsApp.home','homesInternalToolsApp.about','homesInternalToolsApp.login',
    'homesInternalToolsApp.salestool'
    ]);

homesInternalToolsApp.config(function($routeProvider, $locationProvider) {
	
	// Declaration of the default route if neither of the controllers
	// is supporting the request path
	$routeProvider.otherwise({ redirectTo: '/'});

	// disabling # in Angular urls
	// $locationProvider.html5Mode({
	// 		enabled: true,
	//      requireBase: false
	// });
});