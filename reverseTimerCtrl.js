var app = angular.module('visualEngageApp');

  app.directive('reverseTimer',['$interval',function($compile) {
  	return {
  		restrict: 'EA',
  		scope:{
  			date: "="
  		},
	    templateUrl: 'visual_engage/_reverse_timer.html',
	    controller: 'reverseTimerCtrl',
	    controllerAs: '$reverseTimerCtrl',
	    link: function($scope, element, attributes) {
	    	//link if needed
	    }
  	};
  }]);

app.controller('reverseTimerCtrl',['$scope','$interval',function ($scope,$interval) {

	 this.getCountdown = function(){
	 	$scope.target_date = new Date("2017-04-04T12:00:00-06:30").getTime();
		$scope.current_date = new Date().getTime();
		$scope.seconds_left = ($scope.target_date - $scope.current_date) / 1000;
		$scope.days = parseInt($scope.seconds_left / 86400)
		$scope.days = ($scope.days < 10 ? '0' : '') + $scope.days;
		$scope.seconds_left = $scope.seconds_left % 86400;
		$scope.hours = parseInt($scope.seconds_left / 3600);
		$scope.hours = ($scope.hours < 10 ? '0' : '') + $scope.hours; 
		$scope.seconds_left = $scope.seconds_left % 3600;
		$scope.minutes = parseInt($scope.seconds_left / 60) 
		$scope.minutes =  ($scope.minutes < 10 ? '0' : '') + $scope.minutes;
		$scope.seconds = parseInt( $scope.seconds_left % 60 );
		$scope.seconds = ($scope.seconds < 10 ? '0' : '') + $scope.seconds;
	 }
	 $interval(this.getCountdown, 1000);
}]);