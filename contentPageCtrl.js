var app = angular.module('visualEngageApp');

  app.directive('contentPage',function($compile) {
  	return {
  		restrict: 'EA',
  		scope: {
    		device: '=',
    		notificationType: '=',
    		heading: '='
    	},
	    templateUrl: 'visual_engage/_content_page.html',
	    controller: 'contentPageCtrl',
	    controllerAs: '$contentPageCtrl',
        bindToController: true,
       	link: function($scope, element, attributes) {
	    	//link if needed
	    }
  	};
  });


app.controller('contentPageCtrl',['$scope',function($scope){
	this.view = function(){
		if (this.heading == "Build Life Cycle"){
			return 4;
		}else if((this.notificationType[0] == "Android" || this.notificationType[0] == "iPhone") && ((this.notificationType[1] != "Text") || (this.notificationType[1] != "Banner") || (this.notificationType[1] != "Carousel"))){
			return 2;
		}
		else if(this.device == "Android" || this.device == "iPhone"){
			return 1;
		}
		else if(this.heading == "Overview"){
			return 3;
		}
		return 0;
	}

}]);