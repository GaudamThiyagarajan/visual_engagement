var app = angular.module('visualEngageApp');

  app.directive('comingSoon',function($compile) {
  	return {
	    templateUrl: 'visual_engage/_coming_soon.html',
	    controller: 'comingSoonCtrl',
	    controllerAs: '$comingSoonCtrl',
        bindToController: true,
       	link: function($scope, element, attributes) {
	    	//link if needed
	    }
  	};
  });


app.controller('comingSoonCtrl',function($scope){
  
});