#!/usr/bin/env node

(function() {
  var fs = require('fs');
  var _ = require('underscore');


  var path = require('path');

  var isCoveredEnough = function(actual, minimum) {
    minimum  = (minimum) ? minimum : 0;
    return (actual >= minimum) ? 0 : -2;
  };

  var printOutputToConsole = function(content) {
    var printCoverageOf = function(file) {
      console.log(file.filename + " has a coverage of " + file.coverage + "%");
    };
    console.log("------------------------------------------------------------------------");
    console.log("Overall coverage is " +  content.coverage + "%");

    for(var file in content.files) {
      printCoverageOf(content.files[file]);
    }
    console.log("------------------------------------------------------------------------");
  };

  var printOutputToFile = function(content, fileName) {
    var ejs = require('ejs');
    var template = fs.readFileSync(path.resolve(__dirname, 'coverage-report.ejs'), 'UTF-8');
    var html = ejs.render(template, {
        files: _.sortBy(content.files,function(file){
          return file.coverage;
        }),
        coverage: content.coverage
    }) ;
    fs.writeFileSync(fileName, html);
  };

  if(process.argv.length < 3)
    process.exit(-1);

  var fileContent = fs.readFileSync(path.resolve(process.argv[2]), 'UTF-8');
  var json = fileContent.substring(fileContent.indexOf("{\n"), fileContent.length);
  var content = JSON.parse(json);
  printOutputToConsole(content);
  printOutputToFile(content, process.argv[3]);
  process.exit(isCoveredEnough(content.coverage, process.argv[4]));
})();