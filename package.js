Package.describe({
  summary: "run mocha tests in the browser"
});

Package.on_use(function (api, where) {
  //coffeescript included here in case you want to right your tests in it
  api.use(["coffeescript", "templating"], ["client"]);

  //always include test report template (it will be just be an empty
  //div if not tests/framework are added)
  api.add_files(["testReport.html"], "client");

  //for environments like production METEOR_MOCHA_TEST_DIR should be
  //undefined and the test framework will not be included
  if (!process.env.METEOR_MOCHA_TEST_DIR){
    console.log("METEOR_MOCHA_TEST_DIR undefined, not including meteor-mocha-web files");
    return;
  }
  var path = require("path");
  var fs = require("fs");
  var util = require("util");

  api.add_files(['mocha.js', "chai.js", "mocha.css", "preTest.js", "testRunner.js"], "client");

  var self = this;

  //XXX this should only include js or coffee files
  var addFiles = function(dir) {
    files = fs.readdirSync(dir);
    files.forEach(function(file){
      var filePath = path.join(dir, file);
      var relativePath = path.relative(self.source_root, filePath);
      stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        addFiles(filePath);
      } else if (stats.isFile()) {
        api.add_files([relativePath], "client");
      }
    });
  };

  //XXX should be changed to colon separated METEOR_MOCHA_TEST_DIRS
  addFiles(process.env.METEOR_MOCHA_TEST_DIR);

});