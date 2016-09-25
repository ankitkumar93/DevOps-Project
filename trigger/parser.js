"use strict";
var Parser = require('simple-text-parser');
var parser = new Parser();

var result = "success";
function parse(data){
  parser.addRule(/\d failing/ig, function(tag){
    console.log("Inside add rule",tag);
    if(tag !== '0 failing'){
      result = "failure";
    }
    return tag;
  });

  parser.render(data);
  return result;
}

module.exports = parse;
