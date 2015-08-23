
_u_ = {

    user: {
        islogged: function () {
            return Meteor.userId();
        }
    },

    val : {
        isUndefined: function (val) {
            return (typeof val === "undefined");
        }
    },

    generate : {
        uuid : function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },

        dataURLToBlob: function(dataURL) {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {

                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = decodeURIComponent(parts[1]);

                return new Blob([raw], {type: contentType});
            }

            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], {type: contentType});
        }
    },

    /**
     * Execute a string function in their context as example 'myfunction.dosomething.awesome'
     * This normally is use to receive paramater as string in dom attributes as data-some-callback='myfunction.dosomething.awesome'
     * The string function have to be available in the windows or context scope or will not be execute.
     * @param functionName the string function that is gonna be evalute
     * @param context normally is window or another context
     * @returns {function()}
     */
    exe : function(functionName, context /*, args */) {
        var args = [].slice.call(arguments).splice(2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    }
};
