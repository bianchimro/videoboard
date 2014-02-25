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
        scope.playing = false;
            
        scope.play = function(){
            $(target).get(0).play();    
            return false;
        };

        scope.pause = function(){
            $(target).get(0).pause();    
            return false;  
        };

        scope.restart = function(){
            $(target).get(0).pause();    
            $(target).get(0).currentTime = 0;
            $(target).get(0).play();
            return false;  
        };

        $(target).on('play', function(){
            scope.playing = true;
            scope.$apply('playing')
        });

        $(target).on('pause', function(){
            scope.playing = false;
            scope.$apply('playing')
        })

        $(target).on('timeupdate', function(){
            scope.playing = true;
            scope.$apply('playing')
        })
      
    }
  };
});


directives.directive('boundVideo', function() {
  return {
    restrict: 'A',
    scope : true,
    //replace: true,
    //template: '<p style="background-color:red">Hello World</p>',
    link: function(scope, elem, attrs) {
        
        var target = attrs.boundVideo;
        var from = attrs.showFrom;
        var to = attrs.showTo;


        scope.position = 0;
        scope.visible = false;

        $(target).on('timeupdate', function(){
            var position = this.currentTime;
            scope.position = position;
            scope.$apply('position');
        });

        var fromHandler = scope.$watch('position', function(nv){
            if(nv > from && nv < to && !scope.visible){
                $(elem).fadeIn();
                scope.visible = true;
                //fromHandler();
            }
        })

        var toHandler = scope.$watch('position', function(nv){
            if((nv > to || nv < from) && scope.visible){
                $(elem).fadeOut();
                scope.visible = false;
                //toHandler();
            }
        });
    

        /*
        scope.fromHandler = $(target).on('timeupdate.from', function(){
            var position = this.currentTime;
            if (position > from){
                //$(elem).removeClass("hide");
                $(this).off("timeupdate.from", scope.fromHandler);
                $(elem).show();
            }
        });

        scope.toHandler = $(target).on('timeupdate.to', function(){
            var position = this.currentTime;
            if (position > to){
                //$(elem).addClass("hide");
                $(this).off("timeupdate.to", scope.toHandler);
                $(elem).fadeout();
                
                
            }

        });
        */
      
    }
  };
});




})();