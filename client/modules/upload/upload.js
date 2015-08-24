Meteor.startup(function(){

    upload = (function(name){
        var name = name;
        var u = {};


        var states = {
            onStart     : "onStart",
            onProgress  : "onProgres",
            onProcess   : "onProcess",
            onFinish    : "onFinish"
        };

        var watchers = {};
        var eventCallback;
        u.init = function(){
            u.observe();
            channel();
        };

        function channel(){
            //set the channels for this class that will emit the follow events
            broadcast.channel(name,[states.onStart, states.onProgress, states.onProcess, states.onFinish]);
        }

        u.observe = function(){
            $(document).on("change","input[type=file]", uploading);
            camera.subscribe("onCameraSnap", upload.uploadFromCamara);
        };

        u.uploadFromCamara = function(data, blob){
            UploadFsCollection.insert(blob, function (err, fileObj) {
                if (!err) {
                    uploading.watch(fileObj._id);
                }else{
                    //error
                }
            });
        };

        function uploading(eventDom){

            var eventDom = eventDom;
            FS.Utility.eachFile(event, function(file) {

                UploadFsCollection.insert(file, function (err, fileObj) {
                    if (!err) {

                        uploading.watch(fileObj._id, eventDom);

                    }else{
                        //error
                    }
                });

            });
        }

        uploading.watch = function(_id, eventDom){
            var uuid  = ___.generate.uuid();
            var eventDom = eventDom;

            watchers[uuid] = UploadFsCollection.find({_id : _id}).observe({
                changed : function(file, oldFile){
                    console.log(file.uploadProgress());
                    if(file.url() !== null){
                        uploading.onFinish(file._id, uuid, file.url(), eventDom);
                    }
                }
            });
        };

        uploading.onFinish = function(_id, uuid, url, eventDom){

            //THIS SHOULD BE REDO SINCE IS NOT RIGHT THAT THE WATCHER
            if(!___.val.isUndefined(watchers[uuid])){
                watchers[uuid].stop();
                delete watchers[uuid];
            }

            //broadcast event on Finish
            var args = { _id : _id, url : url, event : eventDom };
            broadcast.transmit(name,states.onFinish, args);

        };

        return u;
    })("upload");

    upload.init();
});