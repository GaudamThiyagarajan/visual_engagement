var app = angular.module('visualEngageApp');

  app.directive('runningCampaign',function($compile) {
  	return {
  		restrict: 'EA',
	    templateUrl: 'visual_engage/_running_campaign.html',
	    controller: 'runningCampaignCtrl',
	    controllerAs: '$runningCampaignCtrl',
	    link: function($scope, element, attributes) {
	    	//link if needed
	    }
  	};
  });

app.controller('runningCampaignCtrl',['$scope','$interval',function ($scope) {
	this.campaigns = [
						{
							name: "Cohort 1",
							percentage: 20,
							date: "2017-04-04T12:00:00-06:30"
						},
						{
							name: "Cohort 2",
							percentage: 60,
							date: "2017-04-04T12:00:00-06:30"
						},
						{
							name: "Cohort 3",
							percentage: 35,
							date: "2017-04-04T12:00:00-06:30"
						}
					];
	this.callCurrent = function(){

	}
}]);