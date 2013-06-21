// Load jquery from cdn and then execute the fear-the-IOC.js (see app.js)
var version = 0;
try {
    version = parseFloat($().jquery);
} catch(e) {}

if (version < 1.2){
    var jqueryUrl = "http://code.jquery.com/jquery-1.10.1.min.js",
        script = document.createElement("script"),
        onLoad = function() {
            if (script.removeEventListener) {
                script.removeEventListener("load", onLoad,false);
            } else if (script.readyState) {
                script.onreadystatechange = null;
            }
            document.body.removeChild(script);
            executeBookmarklet(jQuery.noConflict());
        };

    script.src = jqueryUrl;

    if (script.addEventListener) {
       script.addEventListener("load", onLoad,false);
     } else if (script.readyState) {
       script.onreadystatechange = onLoad;
    }
    document.body.appendChild(script);
} else {
    executeBookmarklet(jQuery.noConflict());
}