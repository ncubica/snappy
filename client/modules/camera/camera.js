Meteor.startup(function(){
    camera = (function(){
        var c = {};
        var subscribers = {
            "onCameraSnap" : []
        };

        c.open = function(options){
            var options = options || {};
            MeteorCamera.getPicture(options, camera.snap)
        };

        c.snap = function(error, data){
          if(!error){
              var blob = ___.generate.dataURLToBlob(data);
              camera.onCameraSnap(data, blob);
          }
        };

        c.onCameraSnap = function(data, blob){
            _.each(subscribers.onCameraSnap, function(item){
               item(data, blob);
            });
        };

        /**
         * Subscribe a function into a specific event
         * @param event
         * @param func
         */
        c.subscribe = function(event, func){
          switch (event){
              case "onCameraSnap" :
                  subscribers.onCameraSnap.push(func);
                  break;
          }
        };

        return c;
    })();
});