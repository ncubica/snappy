Meteor.startup(function(){

    login = (function(){

        var s = {};

        s.init  = function(){
            UI();
        };

        function UI(){

            /**
             * Hack reusing ACCOUNT UI
             * TODO: Implement a custom login module :)
             */
            Meteor.setTimeout(function(){
                login.html.adjustLogin();
            },100);

        }

        return s;

    });

    login.html = {
        detachLogin : function(){
            var $loginContainer = $(".dropdown-menu");
            $loginContainer.appendTo(document.body);
            $loginContainer.css({ top: 100, margin : "auto", display : "block" });
            $loginContainer.addClass('animated fadeInDown');
        },
        removeToggeLink : function(){
            $("#login-dropdown-list").remove();
        },
        adjustLogin : function(){
            this.detachLogin();
            this.removeToggeLink();
        },
        close : function(){
            this.removeLastPassItems();
            var $loginContainer = $(".dropdown-menu");
            $loginContainer.addClass('animated fadeOutDown');
        },
        /**
         * The plugin lastPass create their own html and refuse to remove #lol
         * go out of my beautiful animate it login.
         */
        removeLastPassItems : function(){
            $("[id^='__lpform_']").remove();
        }
    };

    Tracker.autorun(function(){
        if(Meteor.user()){
            Router.go("index");
            login.html.close();
        }
    });

});
