var fs = require('fs');
var uglify = require('uglify-js');
var path = require('path');

// fs.readFile wrapper to avoid code repetition
var readFileWrapper = function(filename, fn) {
    fs.readFile(path.resolve(__dirname, filename), 'utf8', function(err, data) {
        if (err) throw err;
        fn(data);
    });
};

var code = ['(function() {']; // ensures global scope is not polluted

readFileWrapper('./../fear-the-IOC.js', function(js) {
     // encapsulates fear-the-ioc in executeBookmarklet() in order to call it when jquery is loaded (see bootstrap.js)
    code.push('function executeBookmarklet($) {');
    code.push(js);
    code.push('}');

    readFileWrapper('./bootstrap.js', function(js) {
        code.push(js); 
        code.push('})();'); // ensures global scope is not polluted end
        code = code.join('');       
        code = uglify.minify(code, {fromString: true}).code; // compress
        console.log("javascript:" + encodeURIComponent(code)); // generates final output
    });
});