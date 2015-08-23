Meteor.startup(function(){

    Router.route('/login', function(){

        if(_u_.user.islogged()){
            this.render("index");
            return;
        }

        this.render("login");
        //initialize
        login().init();
    });

});
