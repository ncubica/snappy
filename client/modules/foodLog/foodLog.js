Meteor.startup(function(){

    foodLog = (function(){
        var f = {};
        var subscriptions = {
            "onFoodLogAdded" : []
        };
        var me = this;

        function broadcast(){
            debugger;
        }

        f.log = function(){
            return {
                userId      : Meteor.userId(),
                createAt    : moment().format(),
                private     : false,
                anonymous   : false,
                url         : ""
            }
        };

        f.init = function(){
            observer();
        };

        onFoodLogAdded = function(foodLog){
            var _foodLog = foodLog;
            _.each(subscriptions.onFoodLogAdded, function(item){
                item(foodLog);
            });
        };

        observer = function(){

            FoodLogCollection.find().observe({
                added : function(foodLog){
                    onFoodLogAdded(foodLog);
                }
            });

        };

        f.onUploadedImage = function(uploadFsId) {
            var file = UploadFsCollection.findOne({_id : uploadFsId});

            var log = this.log();
            log.url = file.url();

            FoodLogCollection.insert(log);
        };

        f.subscribe = function(event, func){
            switch(event){
                case "onFoodLogAdded" :
                    if(typeof  func === "function"){
                        subscriptions.onFoodLogAdded.push(func);
                    }

                    break;
            }
        };

        return f;
    })();

    foodLog.init();
});