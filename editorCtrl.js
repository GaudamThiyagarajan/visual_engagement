var app = angular.module('visualEngageApp');

  app.directive('editor',function($compile) {
    return {
      restrict: 'EA',
      templateUrl: 'visual_engage/_editor.html',
      controller: 'editorCtrl',
      controllerAs: '$editorCtrl',
        bindToController: true,
        link: function($scope, element, attributes) {
        //link if needed
      }
    };
  });



app.controller('editorCtrl',['$scope',function($scope){

  this.colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];
  this.fontSize = 20;
  this.showHtmlContent = false;

  this.attributeClickColor = function(command,value) {
      document.execCommand(command, false, value);
  }

  this.selectedEditContent = "";

  this.changeSelectedEditContent = function(val){
    this.selectedEditContent = val;
  };

  this.attributeClick = function(command) {
    if (command == 'h1' || command == 'h2' || command == 'p') {
      document.execCommand('formatBlock', false, command);
    }
    if (command == 'createlink' || command == 'insertimage') {
      url = prompt('Enter the link here: ', 'http:\/\/');
      document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, null);
    }
  }

  this.showHtml = function(){
    this.showHtmlContent = !this.showHtmlContent;
  }

  this.changeContent = function(className){
    if(className == 'editor' && this.selectedEditContent == 'editor'){
      this.htmlContent = document.getElementById(className).innerHTML
    }else if(className == 'html-code' && this.selectedEditContent == 'html-code'){
      var text = document.getElementById(className).innerHTML
      while(text.search("&gt;") > 0){
        text = text.replace("&gt;", '>');
      }
      while(text.search("&lt;") > 0){
        text = text.replace("&lt;", '<');
      }
      document.getElementById('editor').innerHTML = text
    }
  }

  this.changeFontSize = function(value){
    size = parseInt(document.queryCommandValue("FontSize"));

    if (value == 'increment')
        {
          size = size + 1;
        }
      else if (value == 'decrement')
       { 
        size = size - 1;
      }
    document.execCommand("FontSize", false, size);
  }

}]);