var app = angular.module('visualEngageApp');

  app.directive('sideBar',function($compile) {
  	return {
  		restrict: 'EA',
    	scope: {
    		val: '=',
    		notificationType: '='
    	},
	    templateUrl: 'visual_engage/_side_bar.html',
	    controller: 'sideBarCtrl',
	    controllerAs: '$sideBarCtrl',
	    link: function($scope, element, attributes) {
	    	//link if needed
	    }
  	};
  });

app.controller('sideBarCtrl',['$scope',function ($scope) {
	    	this.mainFeatures = ["BroadCast", "Report" , "Featuring" , "Setting"]
	    	this.BroadCast = ["Push Notification","Ios Notification","Web Notification","Wap Notification","In App Notification"]
	    	this.Report = ["Analytics","Conversion"]
	    	this.Featuring = ["Build Life Cycle","Manage Templates","A-B Testing"]
	    	this.Setting = ["Integrate","Account", "Documentation"]
	    	this.show = [true,true,true,true]
	    	this.already_selected = false
	    	this.updateShow = function(index){
	    		for (i=0; i < this.show.length; i++)
		    		{	if ((i == index) && (this.show[i] == false))
		    			{
		    				this.already_selected = true
		    			}
		    			this.show[i] = true
		    		}
		    	if (!this.already_selected)
		    		{
		    			this.show[index] = false;
		    		}
		    		this.already_selected = false
	    	}

	    	this.position = function(featuring){
	    		for (i=0; i < this.mainFeatures.length; i++)
	    		{
	    			if (this.mainFeatures[i] == featuring)
	    			return i+1;
	    		}
	    	}
	    	this.updateSelected = function(type){
            	$scope.val = type;
            	$scope.notificationType = [null,null];
	    	}

	    	this.evaluvate = function(variable) {
  				if (variable == "BroadCast")
  					return this.BroadCast;
  				if (variable == "Report")
  					return this.Report;
				if (variable == "Featuring")
  					return this.Featuring;
  				if (variable == "Setting")
  					return this.Setting;
			}
	    }]);