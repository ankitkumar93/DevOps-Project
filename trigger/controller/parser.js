"use strict";
var Parser = require('simple-text-parser');
var parser = new Parser();

function parse(data){
var result = "success";

  parser.addRule(/\d failing/ig, function(tag){
    
    if(tag != "0 failing"){
      result = "failure";
    }

  });

  parser.render(data);

  return result;
}

module.exports = parse;
