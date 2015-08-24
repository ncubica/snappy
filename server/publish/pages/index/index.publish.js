Meteor.startup(function () {

    Meteor.publish('foodLog',function(){
        if (this.userId) {
            return BehaviorLogCollection.find({ userId : this.userId });
        }else{
            return [];
        }
    });

    Meteor.publish('user',function(){
        if (this.userId) {
            return Meteor.users.find({ _id : this.userId });
        }else{
            return [];
        }
    });

    Meteor.publish("FsUpload", function(){
        if (this.userId) {
            return UploadFsCollection.find();
        }else{
            return [];
        }
    });

});