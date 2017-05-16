var app = angular.module('visualEngageApp');

 app.controller('homePageCtrl', ['$scope', function($scope){
 	$scope.showNavigator = false;
 	$scope.menuList = ["Push Notification","Ios Notification","Web Notification","Wap Notification","In App Notification", "Analytics","Conversion","Build Life Cycle","Manage Templates","A-B Testing","Integrate","Account", "Documentation"]
  	$scope.showDevice = null;
  	$scope.heading = "Overview";
  	$scope.notificationType = [null,null]
  	$scope.notification_types_to_devices = {
  		"Push Notification": "Android",
  		"Ios Notification": "iPhone"
  		// "Web Notification": "Web",
  		// "Wap Notification" : "Wap"
  	} 
  	$scope.showSideBar = function(show){
 		$scope.showNavigator = show;
 	}

 	$scope.show = function(){
 		try{
 			$scope.menu = $scope.$$childHead.menu;
 			$scope.notificationType = $scope.$$childHead.notificationType;
 		}catch(e){}
 	}

 	$scope.exhibit = function(){
 		try{
 			$scope.notificationType = $scope.$$childHead.notificationType;
 		}catch(e){}
 	}

 	$scope.$watch('menu',function(){
 		$scope.showDevice = null
 			for(type in $scope.notification_types_to_devices){
  				if ($scope.menu!= undefined && $scope.menu != null && $scope.menu == type)
  				{
  					$scope.showDevice = $scope.notification_types_to_devices[type];
  				}
  			}
  		for (i in $scope.menuList){
  			if ($scope.menu!= undefined && $scope.menu != null && $scope.menu == $scope.menuList[i])
  				{
  					$scope.heading = $scope.menu;
            if ($scope.heading == "Build Life Cycle"){
              $scope.showNavigator = false
            }
  				}
  		}
  		if ($scope.showDevice == null)
  		{
  			$scope.showDevice = 'coming-soon'
  		}
 	});

 }]);