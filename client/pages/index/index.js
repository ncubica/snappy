Meteor.startup(function(){

    Template.index.onRendered(function(){
        home = home();
        home.init();
    });

});