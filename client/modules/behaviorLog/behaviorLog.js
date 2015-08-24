Meteor.startup(function(){
    behaviorLog = (function(name){
        var f = {};
        var name = name;
        var states = {
          "onAdded" : "onAdded"
        };

        f.log = function(){
            return {
                userId      : Meteor.userId(),
                createAt    : moment().format(),
                private     : false,
                anonymous   : false,
                url         : "",
                fsFileId    : null
            }
        };

        f.init = function(){
            broadcast.channel(name,states.onAdded);
            broadcast.listen("upload","onFinish", behaviorLog.onUploadedImage);
        };

        f.onUploadedImage = function(response) {
            if(!___.val.isUndefined(response)){
                var log = behaviorLog.log();
                log.fsFileId = response._id;
                log.url = response.url;

                BehaviorLogCollection.insert(log);
                broadcast.transmit(name, states.onAdded, log);
                console.log(log);
            }
        };

        return f;
    })("behaviorLog");

    //if someone complains about the name #lol
    //behaviourLog = behaviorLog;
    //behaviourLog.init();

    behaviorLog.init();

});