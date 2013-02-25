console.log("running post test");
//TODO something better for detecting once we're ready,
//$(document).ready and Meteor.startup are invoked before the div is
//rendered on the page

setTimeout(function(){
  console.log("running mocha");
  mocha.run();
}, 2000);
