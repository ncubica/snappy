Meteor.startup(function(){

    upload = (function(){
        var u = {};

        var watchers = {};
        var eventCallback;
        u.init = function(){
            u.observe();
        };

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

        function uploading(event){

            eventCallback = $(event.target).attr("data-upload-onFinish");

            FS.Utility.eachFile(event, function(file) {

                UploadFsCollection.insert(file, function (err, fileObj) {
                    if (!err) {

                        uploading.watch(fileObj._id);

                    }else{
                        //error
                    }
                });

            });
        }

        uploading.watch = function(_id){
            var uuid = _u_.generate.uuid();
            watchers[uuid] = UploadFsCollection.find({_id : _id}).observe({
                changed : function(file, oldFile){
                    console.log(file.uploadProgress());
                    if(file.url() !== null){
                        uploading.onFinish(file._id, uuid);
                    }
                }
            });
        };

        uploading.onFinish = function(_id, uuid){

            //THIS SHOULD BE REDO SINCE IS NOT RIGHT THAT THE WATCHER
            if(!_u_.val.isUndefined(watchers[uuid])){
                watchers[uuid].stop();
                delete watchers[uuid];
            }

            ////run the string callback
            //_u_.exe(eventCallback, window, _id);
        };

        return u;
    })();

    upload.init();
});

