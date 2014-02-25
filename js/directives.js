(function(){

'use strict';

/* Directives */

var directives = angular.module('videoboardApp.directives', []);

directives.directive('videoAction', function() {
  return {
    restrict: 'A',
    //scope : { action : "@"}
    //replace: true,
    //template: '<p style="background-color:red">Hello World</p>',
    link: function(scope, elem, attrs) {
        
        var target = attrs.target;
            
        scope.play = function(){
            $(target).get(0).play();    
        };

        scope.pause = function(){
            $(target).get(0).pause();    
        };
      
    }
  };
});


directives.directive('boundVideo', function() {
  return {
    restrict: 'A',
    //scope : { action : "@"}
    //replace: true,
    //template: '<p style="background-color:red">Hello World</p>',
    link: function(scope, elem, attrs) {
        
        var target = attrs.boundVideo;
        var from = attrs.showFrom;
        var to = attrs.showTo;
            
        var fromHandler  =$(target).on('timeupdate.from', function(){
            var position = this.currentTime;
            if (position > from){
                $(elem).removeClass("hide");
                $(target).off("timeupdate.from", fromHandler);
            }
        });

        var toHandler = $(target).on('timeupdate.to', function(){
            var position = this.currentTime;
            if (position > to){
                $(elem).addClass("hide");
                $(target).off("timeupdate.to", toHandler);
            }

        });
      
    }
  };
});




})();