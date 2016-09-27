"use strict";
function parse(data){
    var result = "failure";
    var regex = /\d failing/;
    var match = data.search(regex);

    if (match == -1)
        result = "success";

    return result;
}

module.exports = parse;
