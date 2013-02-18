#!/usr/bin/env node

(function() {
    var fs = require('fs');
    var path = require('path');

    var printCoverageOf = function(file) {
        console.log(file.filename + " has a coverage of " + file.coverage + "%");
    };

    var isCoveredEnough = function(actual, minimum) {
        minimum  = (minimum) ? minimum : 0;
        return (actual >= minimum) ? 0 : -2;
    };

    if(process.argv.length < 3)
        return -1;

    var fileContent = fs.readFileSync(path.resolve(process.argv[2]), 'UTF-8');
    var json = fileContent.substring(fileContent.indexOf("{"), fileContent.length);
    var content = JSON.parse(json);

    console.log("------------------------------------------------------------------------");
    console.log("Overall coverage is " +  content.coverage + "%");

    for(var file in content.files) {   
        printCoverageOf(content.files[file]);
    }
    console.log("------------------------------------------------------------------------");
    
    return isCoveredEnough(content.coverage, process.argv[3]);
})();