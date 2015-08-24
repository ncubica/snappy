
Meteor.startup(function(){

    broadcast = (function(){

        var b = {};
        var channels = {};


        function isChannel(channel, event) {
            if(___.val.isUndefined(channels[channel]))
                return false;
            else
                return !___.val.isUndefined(channels[channel][event]);
        }

        /**
         * You can create a channel passing the name of the channel plus
         * event as string or as an array if you want to add several events
         * @param channel
         * @param event
         */
        b.channel = function(channel, event){

            if(!___.val.isUndefined(channel) && !___.val.isUndefined(event)){

                if(___.val.isArray(event)){
                    channels[channel] = channels[channel] || {};
                    _.each(event,function(item){
                        channels[channel][item] = channels[channel][item] || [];
                    });
                }else{
                    channels[channel] = channels[channel] || {};
                    channels[channel][event] = channels[channel][event] || [];
                }
            }

        };

        //TODO: broadcast.listen Maybe add context parameter for the listener? when the callback trigger you could add you own scope?
        b.listen = function(channel,event,callback, context) {
            if(isChannel(channel,event)){
                if(___.val.isFunction(callback)){
                    channels[channel][event].push(callback);
                    return true
                }

                //TODO: broadcast.list -> Support string callbacks
                console.log("Does your function is actually a typeof function?, string function is not support it by now");
                return false;
            }else{
                //create the channel if not exist for the function...
                b.channel(channel,event);
                b.listen(channel,event, callback);
            }
        };

        b.transmit = function(channel, event, args){

            if(isChannel(channel, event)){
                _.each(channels[channel][event],function(callback){
                    if(___.val.isUndefined(args)){
                        callback();
                    }else{
                        callback(args);
                    }
                });
            }

        };

        /**
         *
         * Return all the available channels with there own events
         * you can pass extended === true or just extended !=== to undefined to
         * see the complete version of the function attach to the events instead only the name
         * of the functions
         *
         * @param extended
         */
        b.listChannels = function(extended) {
            _.each(channels, function(channel, channelName){
              console.log(channelName + " [channel] :");
                _.each(channel, function(event, eventName) {
                   console.log("  -" + eventName);
                    _.each(event,function(callback, i) {
                        if(extended) {
                            console.log("   * (" + i + ") " + callback);
                        }
                        else {
                            var name = ___.get.functionName(callback);
                            name = (name === "") ? "(anonymous)" : name;
                            console.log("   * (" + i + ") " + name);
                        }
                    });
                });
            });
        };

        //TODO: broadcast.listChanel list event per channel

        b.listChannel = function(channel){
          ___.notImplemented("b.listChannel");
        };

        return b;
    })();

});
