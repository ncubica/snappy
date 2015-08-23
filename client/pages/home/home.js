home = (function(){
    var h = {};

    h.init = function () {
        h.observer();
    };

    h.observer = function(){
        $(document).on("click",".js-home-openCamara",openCamara);
        foodLog.subscribe("onFoodLogAdded", home.onFoodLogAdded);
    };

    h.onFoodLogAdded = function(response){

    };

    function render(){

    }

    function openCamara(){
        camera.open();
    }

    return h;
});
