(function() {
    var fs = require('fs');
    var path = require('path');

    var printCoverageOf = function(file) {
        console.log(file.filename + " has as coverage of " + file.coverage + "%");
    };

    var isCoveredEnough = function(actual, minimum) {
        minimum  = (minimum) ? minimum : 0;
        return (actual >= minimum) ? 0 : -2;
    };

    if(process.argv.length < 3)
        return -1;

    var fileName = process.argv[2];
    var content = JSON.parse(fs.readFileSync(path.resolve(__dirname, fileName), 'UTF-8'));

    console.log("Overall coverage is " +  content.coverage + "%");

    for(var file in content.files) {   
        printCoverageOf(content.files[file]);
    }

    return isCoveredEnough(content.coverage, process.argv[3]);
})();