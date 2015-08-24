home = (function(){
    var h = {};

    h.init = function () {
        h.observer();
    };

    h.observer = function(){
        $(document).on("click",".js-home-openCamara",openCamara);
    };

    h.onBehaviorLogAdded = function(response){

    };

    function render(){

    }

    function openCamara(){
        camera.open();
    }

    return h;
});
