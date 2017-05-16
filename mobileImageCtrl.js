var app = angular.module('visualEngageApp');

  app.directive('mobileImage',function($compile) {
  	return {
  		restrict: 'EA',
  		scope:{
  			imageType: "=",
  			nType: "="
  		},
  		replace: true,
    	transclude: true,
	    templateUrl: 'visual_engage/_mobile_image.html',
	    controller: 'mobileImageCtrl',
	    controllerAs: '$mobileImageCtrl',
        bindToController: true,
       	link: function($scope, element, attributes) {
	    	//link if needed
	    }
  	};
  });


app.controller('mobileImageCtrl',function(){
	 	   			this.iphones = [
			 	   					{
			 	   						title : "Text",
			 	   						image : "/assets/iphone_text_notif.png"
			 	   					},
			 	   					{
			 	   						title : "Banner",
			 	   						image : "/assets/iphone_banner_notif.png"
			 	   					},
			 	   					{
			 	   						title : "Carousel",
			 	   						image : "/assets/iphone_carousel_notif.png"
			 	   					}
	 	   				  		]
	 	   			 this.androids = [
						 	  		{
						 	    		title : "Text",
						 	    		image : "/assets/android_text_notif.png"
						 	    		},
						 	    	{
						 	    		title : "Banner",
						 	   			image : "/assets/android_banner_notif.png"
						 	   		},
						 	   		{
						 	   			title : "Carousel",
						 	   			image : "/assets/android_carousel_notif.png"
						 	   		}
	 	   						]
	 	   	 this.getMobileDevice = function(device){
	 	   		if (device == "iPhone"){
	 	   	 		return this.iphones
	 	   	 	}
	 	   	 	if (device == "Android"){
	 	   	 		return this.androids
	 	    	}
	 	   	 }

	 	   	 this.selectNotificationType = function(device,type){
	 	   	 	this.nType = [device,type]; 
	 	   	 }
});