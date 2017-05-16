var app = angular.module('visualEngageApp');

  app.directive('broadcast',function($compile) {
  	return {
      restrict: 'EA',
      scope:{
        deviceType: "=",
        nType: "="
      },
      replace: true,
      transclude: true,
      templateUrl: 'visual_engage/_broadcast.html',
      controller: 'broadcastCtrl',
      controllerAs: '$broadcastCtrl',
        bindToController: true,
        link: function($scope, element, attributes) {
        //link if needed
      }
  	};
  });


app.controller('broadcastCtrl',function($scope){
    this.carouselCount = 2;
    this.active_one = 1;
    this.active_two = 2;
    this.active_one_image = "/assets/place-holder-1.png";
    this.active_two_image = "/assets/place-holder-2.png";
    this.input_variables = [
                              {
                                key: "Title", 
                                text: "Enter Title : ",
                                row: "1" ,
                                var_value: "Title goes here",
                                type: "common",
                                id: 0
                              },
                              {
                                key: "Description", 
                                text: "Enter Description : ",
                                row: "2" ,
                                var_value: "Description goes here",
                                type: "common",
                                id: 0
                              },                             
                              {
                                key: "Content - Text", 
                                text: "Enter content text : ",
                                row: "2" ,
                                var_value: "Content text goes here",
                                type: "common",
                                id: 0
                              },
                              {
                                key: "Url", 
                                text: "Enter Url : ",
                                row: "1" ,
                                var_value: "Url goes here",
                                type: "common",
                                id: 0
                              },
                              {
                                key: "Big - Image", 
                                text: "Enter image url : ",
                                row: "1",
                                var_value: "Image Url goes here",
                                type: "Banner",
                                id: 0
                              },
                              {
                                key: "Carousel - Image 1",
                                text: "Enter Carousel Image 1: ",
                                row: "1" ,
                                var_value: "Image Url goes here",
                                type: "Carousel",
                                id: 1
                              },
                              {
                                key: "Carousel - Image 2", 
                                text: "Enter Carousel Image 2: ",
                                row: "1" ,
                                var_value: "Image Url goes here",
                                type: "Carousel",
                                id: 2
                              }
                            ];
    this.drop_down = { "Title" : false,  "Description" : false,  "Big - Image" : false,  "Content - Text" : false,  "Url" : false}; 
  this.getImage = function(){ 
  if (this.nType[0]!= undefined && this.nType[0]!= null && this.nType[1]!= undefined && this.nType[1]!= null)
   { var img = "/assets/"+ this.nType[0].toLowerCase() + "_" + this.nType[1].toLowerCase() + "_notif.png"
      return img;
    }
  }
    this.showType = function(){
      this.already_available = false;
      if(this.nType[1] == "Banner"){
        return 1;
      }else if(this.nType[1] == "Carousel"){
        return 2;
      }
    }
    this.pushOnClick = function(){
      this.carouselCount += 1;
      this.input_variables.push({
                                key: "Carousel - Image "+this.carouselCount, 
                                text: "Enter Carousel Image : ",
                                row: "1" ,
                                var_value: "Image Url goes here",
                                type: "Carousel",
                                id: this.carouselCount
                              });
    }

    this.popOnClick = function(){
      this.carouselCount -= 1;
      this.input_variables.pop();
    }

  this.isActive = function(id){
    if (this.active_one == id || this.active_two == id)
      { 
        return true;}
    return false;
  }
  this.updateActive = function(type){
      if (type == 'prev'){
        this.active_one -= 1;
        this.active_two -= 1;
        if (this.active_one == 0)
          this.active_one = this.carouselCount;
        if (this.active_two == 0)
          this.active_two = this.carouselCount;
      }
      if (type == 'next'){
        this.active_one += 1;
        this.active_two += 1;
        if (this.active_one > this.carouselCount)
          this.active_one %= this.carouselCount;
        if (this.active_two > this.carouselCount)
          this.active_two %= this.carouselCount;
      }
      if (this.values['Carousel - Image '+this.active_one] == "Image Url goes here")
      {this.active_one_image = "/assets/place-holder-"+this.active_one+".png";}
    else
      {this.active_one_image = this.values['Carousel - Image '+this.active_one];}

    if (this.values['Carousel - Image '+this.active_two] == "Image Url goes here")
      {this.active_two_image = "/assets/place-holder-"+this.active_two+".png";}
    else
      {this.active_two_image = this.values['Carousel - Image '+this.active_two];}
      
  }

    this.showTrash = function(id){
      return ((this.carouselCount == id) && (this.carouselCount > 2));
    }

    this.getCarouselImage = function(key,id){
    if (this.values[key] == "Image Url goes here"){
        return "/assets/place-holder-"+id+".png"
      }
       return this.values[key]
    }

    this.isAllowed = function(type){
      if(this.nType[1] == type){
        return true;
      }else if(type == "common"){
        return true;
      }
      return false;
    }

    this.updateDropDown = function(title){
      var checkDropDown = this.drop_down[title];
      for (i in this.drop_down){
        this.drop_down[i] = false;
      }
      this.drop_down[title] = !checkDropDown;
    }

});