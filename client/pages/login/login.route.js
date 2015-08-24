Meteor.startup(function(){

    Router.route('/login', function(){

        if(___.user.islogged()){
            this.render("index");
            return;
        }

        this.render("login");
        //initialize
        login().init();
    });

});
