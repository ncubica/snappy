
UploadStoreGridFS = new FS.Store.GridFS("upload");
UploadFsCollection = new FS.Collection("upload", {
    stores: [UploadStoreGridFS]
});

UploadFsCollection.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});
