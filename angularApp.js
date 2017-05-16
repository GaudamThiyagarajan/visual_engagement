var visualEngageApp = angular.module('visualEngageApp',['ui.router', 'templates','angular-svg-round-progressbar']);
visualEngageApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
        .state('home_page',{
            url:'',
            templateUrl: 'visual_engage/_home_page.html',
            controller: 'homePageCtrl'
        }).state('broadcast.push_notification',{
        	url:'',
            templateUrl: 'visual_engage/_home_page.html',
            controller: 'homePageCtrl'
        });
    $urlRouterProvider.otherwise('home');
}]);
