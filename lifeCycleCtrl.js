var app = angular.module('visualEngageApp');

  app.directive('lifeCycle',function($compile) {
    return {
      restrict: 'EA',
      templateUrl: 'visual_engage/_life_cycle.html',
      controller: 'lifeCycleCtrl',
      controllerAs: '$lifeCycleCtrl',
        bindToController: true,
        link: function($scope, element, attributes) {
        //link if needed
      }
    };
  });



app.controller('lifeCycleCtrl',['$scope',function($scope){
    this.rectHeight = 70;
    this.rectWidth = 280;
    this.outerProjectionRadius = this.rectHeight/2;
    this.rectDragging = null;
    this.rectArrowDragging = null;
    this.distance = 15;
    this.selectedEventHeader = "dummy";
    this.eventActions = [{
      type: "Triggers",
      glyphicon: "glyphicon-bell",
      "glyph-box-color": "rgb(17, 158, 0)",
      "rect-color": "rgba(33, 255, 6, 0.741176)"
    },{
      type: "Actions",
      glyphicon: "glyphicon-globe",
      "glyph-box-color": "rgb(0, 100, 158)",
      "rect-color": "rgba(6, 152, 255, 0.741176)"
    },
    {
      type: "Condition",
      glyphicon: "glyphicon-warning-sign",
      "glyph-box-color": "rgb(158, 0, 91)",
      "rect-color": "rgba(255, 6, 150, 0.741176)"
    },
    {
      type: "Flow Control",
      glyphicon: "glyphicon-fire",
      "glyph-box-color": "rgb(189, 155, 29)",
      "rect-color": "rgba(255, 190, 6, 0.741176)"
    }];
    this.saveNames = [];
    this.styleSmallRect = {"fill": "rgb(158, 0, 91)"}
    this.smallRectX = -10;
    this.smallRectY = 10;
    this.smallRectWidth = 50;
    this.smallRectHeight = 50;
    this.subEvents = {
      "Triggers": [
            {type: "Event",glyphicon: "glyphicon-bullhorn",possible_values: []},
            {type: "Segment",glyphicon:"glyphicon-sort-by-attributes",possible_values: []},
            {type: "Attribute Change",glyphicon:"glyphicon-pencil",possible_values: []},
            {type: "Specific Users",glyphicon:"glyphicon-user",possible_values: []},
            {type: "Geo-Fence",glyphicon:"glyphicon-barcode",possible_values: []}
        ],
      "Actions": [
            {type: "Send Email",glyphicon:"glyphicon-inbox",possible_values: ["On Sent","On Delivered","On Open","On Click","On Bounce","On Subscribe"]},
            {type: "Send SMS",glyphicon:"glyphicon-envelope",possible_values: ["On Sent","On Delivered","On Failed","On Read"]},
            {type: "Send Push",glyphicon:"glyphicon-send",possible_values: ["On Sent","On Delivered","On Read"]},
            {type: "In App Message",glyphicon:"glyphicon-picture",possible_values: []},
            {type: "Send Web Push",glyphicon:"glyphicon-comment",possible_values: ["On Sent","On Delivered","On Read"]},
            {type: "Call API",glyphicon:"glyphicon-share",possible_values: ["On Success","On Failure"]},
            {type: "Set User Attribute",glyphicon:"glyphicon-ok-circle",possible_values: []}
        ],
      "Condition": [
            {type: "Is In Segment",glyphicon:"glyphicon-retweet",possible_values: ["Yes","On"]},
            {type: "Has Done Event",glyphicon:"glyphicon-ok",possible_values: ["Yes","On"]},
            {type: "Check User Attribute",glyphicon:"glyphicon-list-alt",possible_values: ["True","False"]},
            {type: "Engagement Response",glyphicon:"glyphicon-gift",possible_values: ["On Success","On Failure"]},
            {type: "Reachable On Channel",glyphicon:"glyphicon-leaf",possible_values: ["Yes","On"]}
        ],
      "Flow Control": [
            {type: "Wait for some time",glyphicon:"glyphicon-dashboard",possible_values: []},
            {type: "Wait for an Event",glyphicon:"glyphicon-tasks",possible_values: ["On Event","On TimeOut"]},
            {type: "Wait for a Date",glyphicon:"glyphicon-calendar",possible_values: ["On Date","On Window Miss"]},
            {type: "End Journey",glyphicon:"glyphicon-pushpin",possible_values: []},
            {type: "A/B Split",glyphicon:"glyphicon-adjust",possible_values: []}
      ]
    }
    var x,y;

    this.notificationType = [null,null];

    this.glyphiconStyleObject = {
          "font-size": "25px",
          "color": "white"
    }
        this.glyphiconTrashStyleObject = {
          "font-size": "15px",
          "color": "white"
    }
this.placeHolder = [];
this.eventContainer = [];

    this.updateSelectedDevice = function(device){
      this.selectedDevice = device;
    }

    this.showMobileDevice = function(){
      if((this.notificationType[0] == "Android" || this.notificationType[0] == "iPhone") && ((this.notificationType[1] != "Text") || (this.notificationType[1] != "Banner") || (this.notificationType[1] != "Carousel"))){
        return 2;
      }else if (this.selectedDevice == "Android"){
        return 1;
      }
      else if(this.selectedDevice == "iPhone"){
        return 1;
      }
      return 0;
    }

    this.tinymceModel = 'Initial content';

  this.tinymceOptions = {
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };
  
  this.getContent = function() {
    console.log('Editor content:', $scope.tinymceModel);
  };

  this.setContent = function() {
    this.tinymceModel = 'Time: ' + (new Date());
  };


    this.getParentEvent = function(container){
      try{
         for(var q = 0; q < this.eventActions.length;  q++){
              if (this.eventActions[q].type == container.parentEvent)
                {parentEvent = this.eventActions[q]}
            }
            return parentEvent;
      }catch(e){}
    }

    this.matchesNType = function(text){
      text = text.split(',')
        for (t in text){
          if (this.notificationType[1] == text[t])
          {
            return true;
          }
        }
        return false;
    }

    this.getSubEvent = function(container){
      try{
          for(var r=0; r < this.subEvents[container.parentEvent].length; r++){
            if (this.subEvents[container.parentEvent][r].type == container.subEvent)
                {
                  subEvent = this.subEvents[container.parentEvent][r];
                }
              }
        return subEvent;
        }catch(e){}
    }

    this.set = function(name){
      if (name == "temp")
      {
        localStorage.setItem("temp",JSON.stringify(this));
      }
      else
      {
        var saves = localStorage.getItem("saveNames");
        if (saves == null){
          localStorage.setItem("saveNames",this.saveJourney);
        }
        else{
         saves = saves.split(",")
         saves.push(this.saveJourney);
         localStorage.setItem("saveNames",saves.join(","));
        }
        localStorage.setItem(this.saveJourney,JSON.stringify(this));
        this.saveNames = saves;
      }
    }
    this.setResetName = function(name){
      this.resetTo = name; 
    }

    this.reset = function(name){
     this_temp = JSON.parse(localStorage.getItem(name));
      for (keys in this_temp)
        {
          if (keys != "saveNames")
          {this[keys] = this_temp[keys];}
        }
    }

    this.setSaveNames = function(){
      this.saveNames = localStorage.getItem("saveNames").split(",");
    }

    this.insertEvent = function(subEvent,parentEvent){
        this.placeHolder.push({x: 350,y: 50});
        var _possible_values = false;
        if (subEvent.possible_values.length > 0){
          _possible_values = true;
        }
        this.eventContainer.push({
        value: null,
        arrowDragging: null,
        cx: this.placeHolder[this.placeHolder.length - 1].x + this.rectWidth,
        cy: this.placeHolder[this.placeHolder.length - 1].y + this.outerProjectionRadius,
        outerProjectionObject: {
            r: this.outerProjectionRadius,
            fill: "rgba(255, 6, 150, 0)"
          },
        innerProjectionObject: {
          r: this.distance,
          fill: "rgba(255, 6, 150, 0)"
        },
        rectangularObject: {
            fill: "rgba(14, 14, 14, 0.741176)",
            width: this.rectWidth,
            height: this.rectHeight
          },
        glyphiconObject: subEvent.glyphicon,
        "glyph-box-color": {"fill": "black"},
        "delete-circle": {"fill": "black",r: "15px"},
        subEvent: subEvent.type,
        value: subEvent.type,
        parentEvent: parentEvent.type, 
        has_possible_values: _possible_values,
        pointerElement: [
          {
              trigger_click: true,
              arrowDispatched : false,
              arrowStyleObject : {
                                  "fill": parentEvent["glyph-box-color"],
                                  "stroke": parentEvent["rect-color"],
                                  "stroke-width":1
                                },
              lineStyleObject : {
                "stroke":"#000",
                 "stroke-width":"2"
               },
              x_arrow : 100,
              trianglePointAX : 100,
              y_arrow : 100,
              trianglePointAY : 100,
              linePtX : 100,
              linePtY : 100,
              pointing_to: null,
              value: null
        }]});
    }

    this.resetShowHeader = function(value){
        this.showEventHeader = value;
        this.selectedEventHeader = "dummy";
    }

    this.rectMouseDown = function (eventArgs,index) {
        this.rectDragging = index;
        placeHolder = this.placeHolder[this.rectDragging];
        x = eventArgs.clientX - placeHolder.x;
        y = eventArgs.clientY - placeHolder.y;
    };

    this.arrowMouseDown = function(eventArgs,index,arrowIndex){
      this.eventContainer[index].arrowDragging = arrowIndex;
      this.rectArrowDragging = index;
      this.eventContainer[index].pointerElement[arrowIndex].pointing_to = null;
      this.eventContainer[index].pointerElement[arrowIndex].trigger_click = true;
    }

    this.mouseOverProjector = function(eventArgs,index){
      this.eventContainer[index].innerProjectionObject = {
        r: this.distance, 
        fill: this.getParentEvent(this.eventContainer)["glyph-box-color"]
      }
    }

    this.mouseOutProjector = function(eventArgs,index){
      this.eventContainer[index].innerProjectionObject = {
        r: this.distance,
        fill: "rgba(255, 6, 150, 0)"
      }
    }

        this.computeRectangleMovement = function(eventArgs){
          if (this.rectDragging != null)
          {
          placeHolder = this.placeHolder[this.rectDragging];
          container = this.eventContainer[this.rectDragging];
            placeHolder.x = eventArgs.clientX - x;
            placeHolder.y = eventArgs.clientY - y;
            container.cx = placeHolder.x + this.rectWidth;
            container.cy = placeHolder.y + this.outerProjectionRadius;
            container.midPointXOfRect = placeHolder.x + (this.rectWidth/2);
            container.midPointYOfRect = placeHolder.y + (this.rectHeight/2);
            this.computeCutOff(this.rectDragging);
            for(i=0;i < container.pointerElement.length;i++){
              this.computeTrianglePoints(this.rectDragging,i);
              if(!container.pointerElement[i].arrowDispatched){
                container.pointerElement[i].trianglePointAX = container.cx + this.distance;
                container.pointerElement[i].trianglePointAY = container.cy;
                container.pointerElement[i].arrowStyleObject = {
                                 fill: "rgba(0, 0, 0, 0)"
                               };
                container.pointerElement[i].lineStyleObject = {
                                   "stroke-width":"0"
                               }
                           }
            }
          }
        }

        this.setArrowConditionValue = function(arrowPointer,value){
            arrowPointer.value = value;
        }

        this.setEventName = function(type){
          for(var m = 0;m < this.eventActions.length; m++){
            if (this.eventActions[m].type == type)
            {
              this.selectedEventHeader = type;
              return;
            }
            else{
              for (var q = 0;q < this.subEvents[this.eventActions[m].type].length; q++)
              {
                if(this.subEvents[this.eventActions[m].type][q].type == type){
                  this.insertEvent(this.subEvents[this.eventActions[m].type][q],this.eventActions[m]);
                }
              }
            }
          }
        }

        this.returnEventNames = function(){
          for(var m = 0;m < this.eventActions.length; m++){
            if (this.selectedEventHeader == this.eventActions[m].type)
            {
              return this.subEvents[this.eventActions[m].type];
            }
        }
          return this.eventActions;
        }

        this.resetEventName = function(){
            var wd = 475 * this.returnEventNames().length;
               return wd;
        }

        this.editText = function(container){
          var input = prompt("enter name")
          if (input != undefined && input != null && input.length > 3)
          { container.value = input;
          }
        }

    this.mouseMove = function (eventArgs) {
        if (this.rectDragging != null) {
          container = this.eventContainer[this.rectDragging];
            this.computeRectangleMovement(eventArgs);
            parentEvent = this.getParentEvent(container);
            container.rectangularObject = {
            fill: parentEvent["rect-color"],
            width: this.rectWidth,
            height: this.rectHeight
          }
          container["glyph-box-color"] = {"fill": parentEvent["glyph-box-color"]}
          container["delete-circle"] = {"fill": parentEvent["glyph-box-color"],r: "15px"}
            container.innerProjectionObject = {
              r: this.distance,
              fill: "rgba(255, 6, 150, 0)"
            }
            for(var z = 0;z < this.eventContainer.length; z++){
              for(var w = 0;w < this.eventContainer[z].pointerElement.length; w++){
                  if (this.eventContainer[z].pointerElement[w].arrowDispatched && this.eventContainer[z].pointerElement[w].pointing_to != null){
                      var pointing_to = this.eventContainer[z].pointerElement[w].pointing_to 
                      var triangle = this.eventContainer[z].pointerElement[w]
                      triangle.trianglePointAX = this.eventContainer[pointing_to].midPointXOfRect;
                      triangle.trianglePointAY = this.eventContainer[pointing_to].midPointYOfRect;
                      this.computeRelationship(z,w);
                      this.computeTrianglePoints(z,w);
                  }
              }
            }
          }
      if (this.rectArrowDragging != null){
        container = this.eventContainer[this.rectArrowDragging];
        if (container.arrowDragging != null){
          parentEvent = this.getParentEvent(container);
                  container.pointerElement[container.arrowDragging].arrowStyleObject = {
                                       "fill": parentEvent["glyph-box-color"],
                                      "stroke":parentEvent["rect-color"],
                                      "stroke-width":1
                                     };
                  container.pointerElement[container.arrowDragging].lineStyleObject = {
                                      "stroke":"#000",
                                       "stroke-width":"2"
                                     }
                    container.pointerElement[container.arrowDragging].arrowDispatched = true;
                    container.pointerElement[container.arrowDragging].trianglePointAX = eventArgs.clientX - container.pointerElement[container.arrowDragging].x_arrow;
                    container.pointerElement[container.arrowDragging].trianglePointAY = eventArgs.clientY - container.pointerElement[container.arrowDragging].y_arrow;
                    this.computeCutOff(this.rectArrowDragging);
                    this.computeTrianglePoints(this.rectArrowDragging,container.arrowDragging);
                  }
         };
        }

    this.computeTrianglePoints = function(container_id,element_id){
      container = this.eventContainer[container_id];
      var triangle = container.pointerElement[element_id]
      var slope = (triangle.trianglePointAY - container.midPointYOfRect)/(triangle.trianglePointAX - container.midPointXOfRect);
      triangle.linePtX = (this.distance/Math.sqrt(parseFloat(slope * slope) + 1))
     if (triangle.trianglePointAX > container.midPointXOfRect){
      triangle.linePtX = triangle.trianglePointAX - triangle.linePtX;
     }else{
       triangle.linePtX = triangle.trianglePointAX +  triangle.linePtX;
     }
      triangle.linePtY = Math.sqrt((this.distance * this.distance) - ((triangle.linePtX - triangle.trianglePointAX) * (triangle.linePtX - triangle.trianglePointAX)))
      if (triangle.trianglePointAY > container.midPointYOfRect){
        triangle.linePtY = triangle.trianglePointAY - triangle.linePtY;
      }
    else{
          triangle.linePtY = triangle.trianglePointAY + triangle.linePtY;
      }
      var inverse_slope = -(1/slope)
      triangle.trianglePointBX = (this.distance/Math.sqrt(parseFloat(inverse_slope * inverse_slope) + 1))
      triangle.trianglePointCX = triangle.trianglePointBX + triangle.linePtX;
      triangle.trianglePointBX = triangle.linePtX - triangle.trianglePointBX;
      triangle.trianglePointBY = Math.sqrt((this.distance * this.distance) - ((triangle.linePtY - triangle.trianglePointAY) * (triangle.linePtY - triangle.trianglePointAY)))
      var computedOffset = triangle.trianglePointBY
      if ((triangle.trianglePointAX > container.midPointXOfRect && triangle.trianglePointAY > container.midPointYOfRect) || (triangle.trianglePointAX < container.midPointXOfRect && triangle.trianglePointAY < container.midPointYOfRect)){
      triangle.trianglePointBY = computedOffset + triangle.linePtY;
      triangle.trianglePointCY = triangle.linePtY - computedOffset;
      }
      else{
         triangle.trianglePointCY = triangle.trianglePointBY + triangle.linePtY;
         triangle.trianglePointBY = triangle.linePtY - triangle.trianglePointBY;
      }
    }

    this.computeCutOff = function(index){
            container = this.eventContainer[index];
            placeHolder = this.placeHolder[index];
            container.rectangularObjectTopLayer = {
              width: 1500,
              height: placeHolder.y
            }

            container.rectangularObjectBottomLayer = {
              width: 1500,
              height: 1500
            }

            container.rectangularObjectLeftLayer = {
              width: placeHolder.x,
              height: 1500
            }

            container.rectangularObjectRightLayer = {
              width: 1500,
              height: 1500
            }
    }

    this.releaseRect = function (){
        this.rectDragging = null;
        this.rectArrowDragging = null;
        for (j = 0; j < this.eventContainer.length; j++){
        container = this.eventContainer[j];
        container.arrowDragging = null;
          for (i = 0;i < container.pointerElement.length; i++){
            if ((container.pointerElement[i].trianglePointAX > (container.cx - this.outerProjectionRadius)) && (container.pointerElement[i].trianglePointAX < (container.cx + this.outerProjectionRadius))){
              if ((container.pointerElement[i].trianglePointAY > (container.cy - this.outerProjectionRadius)) && (container.pointerElement[i].trianglePointAY < (container.cy + this.outerProjectionRadius))){
                  container.pointerElement[i].arrowDispatched = false;
                  container.pointerElement[i].trianglePointAX = container.cx + this.distance;
                  container.pointerElement[i].trianglePointAY = container.cy;
            }
          }
          if(container.pointerElement[i].arrowDispatched){
            parentEvent = this.getParentEvent(container);
            container.pointerElement[i].arrowStyleObject = {
                                      "fill": parentEvent["glyph-box-color"],
                                      "stroke":parentEvent["rect-color"],
                                      "stroke-width":1
                                 };
            container.pointerElement[i].lineStyleObject = {
                                  "stroke":"#000",
                                   "stroke-width":"2"
                                 }         
            this.computeRelationship(j,i); 
            this.computeTrianglePoints(j,i);
          }
          else{
            container.pointerElement[i].arrowStyleObject = {
                                   fill: "rgba(0, 0, 0, 0)"
                                 };
            container.pointerElement[i].lineStyleObject = {
                                     "stroke-width":"0"
                                 }
                               }
            }
          }
    };


    this.computeRelationship = function(rectangleIndex,arrowIndex){
      triangle = this.eventContainer[rectangleIndex].pointerElement[arrowIndex];
          for (k = 0; k < this.eventContainer.length; k++){
            if (k != rectangleIndex){
              container = this.eventContainer[k];
              placeHolder = this.placeHolder[k];
              if ((triangle.trianglePointAX >= placeHolder.x) && (triangle.trianglePointAX <= (placeHolder.x + this.rectWidth)) && (triangle.trianglePointAY > placeHolder.y) && (triangle.trianglePointAY < (placeHolder.y + this.rectHeight)))
                {
                  this.point_to_border(triangle,rectangleIndex,k,arrowIndex);
                }
            }
          }
    }

      this.eventFire = function(el, etype){
        if (el.fireEvent) {
         (el.fireEvent('on' + etype));
        } else {
          var evObj = document.createEvent('Events');
          evObj.initEvent(etype, true, false);
          el.dispatchEvent(evObj);
        }
      }

    this.point_to_border = function(triangle,parentRect,pointedRect,arrowIndex){
      parentRectIndex = parentRect
      parentRect = this.eventContainer[parentRect]
      pointedPlaceHolder = this.placeHolder[pointedRect]
      var ptsOnRectangle = null;
      var line_slope = (parentRect.midPointYOfRect - triangle.trianglePointAY)/(parentRect.midPointXOfRect - triangle.trianglePointAX)
      if (((this.rectHeight/2) >= (-1 * (line_slope * this.rectWidth/2))) && (line_slope * this.rectWidth/2) <= (this.rectHeight/2)){
          if (parentRect.midPointXOfRect > triangle.trianglePointAX){
            ptsOnRectangle = this.computeIntersection(parentRect.midPointXOfRect,parentRect.midPointYOfRect,triangle.trianglePointAX,triangle.trianglePointAY,pointedPlaceHolder.x  + this.rectWidth,pointedPlaceHolder.y + this.rectHeight,pointedPlaceHolder.x + this.rectWidth,pointedPlaceHolder.y,"right");
          }
          else{
            ptsOnRectangle = this.computeIntersection(parentRect.midPointXOfRect,parentRect.midPointYOfRect,triangle.trianglePointAX,triangle.trianglePointAY,pointedPlaceHolder.x,pointedPlaceHolder.y,pointedPlaceHolder.x,pointedPlaceHolder.y + this.rectHeight,"left");
          }
      }
      if ((this.rectWidth/2) >= (-1 * ((this.rectHeight/2)/line_slope)) && (((this.rectHeight/2)/line_slope) <= (this.rectWidth/2))){
        if (parentRect.midPointYOfRect > triangle.trianglePointAY){
             ptsOnRectangle = this.computeIntersection(parentRect.midPointXOfRect,parentRect.midPointYOfRect,triangle.trianglePointAX,triangle.trianglePointAY,pointedPlaceHolder.x,pointedPlaceHolder.y + this.rectHeight,pointedPlaceHolder.x + this.rectWidth,pointedPlaceHolder.y + this.rectHeight,"bottom");
          }
          else{
            ptsOnRectangle = this.computeIntersection(parentRect.midPointXOfRect,parentRect.midPointYOfRect,triangle.trianglePointAX,triangle.trianglePointAY,pointedPlaceHolder.x,pointedPlaceHolder.y,pointedPlaceHolder.x + this.rectWidth,pointedPlaceHolder.y,"top");
          }
      }
      if (ptsOnRectangle != null)
        {
          triangle.trianglePointAX = ptsOnRectangle[0];
          triangle.trianglePointAY = ptsOnRectangle[1];
          triangle.pointing_to = pointedRect;
          container = this.eventContainer[parentRectIndex];
          if (triangle.trigger_click && container.has_possible_values)
          { 
            this.eventFire(document.getElementById('myArrowPointerToggler_'+ parentRectIndex +'_' + arrowIndex),'click');
            triangle.trigger_click = false;
          }
        }
    }

    this.computeIntersection = function(x1,y1,x2,y2,x3,y3,x4,y4){
      var dae = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
      var xi = ((x3 - x4) * (x1 * y2 - y1 * x2) - (x1 - x2) * (x3 * y4 - y3 * x4)) / dae;
      var yi = ((y3 - y4) * (x1 * y2 - y1 * x2) - (y1 - y2) * (x3 * y4 - y3 * x4)) / dae;
        return [xi,yi]
    }

    this.pushHand = function(eventArgs,index){
      var arrowYetToDispatch = false;
      var arrowNotDispatchedNumber = null;
      container = this.eventContainer[index];
      for(i = 0;i < container.pointerElement.length; i++){
        if (container.pointerElement[i].arrowDispatched == false)
        {
          arrowYetToDispatch = true;
          arrowNotDispatchedNumber = i;
          break;
        }
      }
      if (!arrowYetToDispatch)
      {
        parentEvent = this.getParentEvent(container);
        container.pointerElement.push({
          arrowDispatched : false,
          arrowStyleObject : {
                              "fill": parentEvent["glyph-box-color"],
                              "stroke":parentEvent["rect-color"],
                              "stroke-width":1
                            },
          lineStyleObject : {
            "stroke":"#000",
             "stroke-width":"2"
           },
          x_arrow : 100,
          trianglePointAX : container.cx + this.distance,
          y_arrow : 100,
          trianglePointAY : container.cy,
          linePtX : container.cx,
          linePtY : container.cy
        });
              this.rectArrowDragging = index;
              container.arrowDragging = container.pointerElement.length - 1;
              this.computeTrianglePoints(index,container.arrowDragging);
              container.pointerElement[container.arrowDragging].arrowDispatched = true;
                 container.pointerElement[container.arrowDragging].arrowStyleObject = {
                                  fill: "rgba(0, 0, 0, 0)"
                              };
                container.pointerElement[container.arrowDragging].lineStyleObject = {
                                   "stroke-width":"0"
                               }
            }
      else{
          container.arrowDragging = arrowNotDispatchedNumber;
      }
    }

    this.deleteEventRect = function(index){
     if (confirm("Do you want to delete this block ?")){
           for(var e=0;e < this.eventContainer.length;e++){
             container = this.eventContainer[e];
             for(var h=0;h < container.pointerElement.length; h++){
               pointerElement = container.pointerElement[h]
               if(pointerElement.pointing_to == index)
               {pointerElement.pointing_to = null}
             }
           }
           this.eventContainer[index] = {pointing_to:null,deleted:true,opacity:1,pointerElement:[]};
           this.placeHolder[index] = {x: -1000,y: -1000}
         }}

    this.applyStyle = function(index){
      container = this.eventContainer[index]
      container.outerProjectionObject = {
        r: this.outerProjectionRadius,
        fill: this.getParentEvent(container)["rect-color"],
        opacity: 0.2
      }
    }

    this.removeStyle = function(index){
      container = this.eventContainer[index]
      container.outerProjectionObject = {
        r: this.outerProjectionRadius,
        fill: "rgba(255, 6, 150, 0)"
      }
    }

  }]);