Meteor.startup(function(){

    Router.route('/', {

        name : "index",

        waitOn : function(){
            if(!___.user.islogged())
                this.redirect("login");

            return  [
                        Meteor.subscribe("user"),
                        Meteor.subscribe("foodLog"),
                        Meteor.subscribe("FsUpload")
                    ];
        },

        onBeforeAction : function(){
            if(!___.user.islogged())
                this.redirect("login");

            this.next();
        },

        action : function(){
            this.render("index");
            //inits are inside of Template.index.rendered
        }

    });

});
