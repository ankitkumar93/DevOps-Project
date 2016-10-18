"use strict";
function parse(data){
    var result = "failure";
    var testData = data.split("TEST:Start")[1].split("TEST:Finished")[0];
    var analysisData = data.split("ANALYSIS:Start")[1].split("ANALYSIS:Finished")[0];

    console.log("Test\n");
    console.log(testData);
    console.log("\n\n\n");

    console.log("Analysis\n");
    console.log(analysisData);
    console.log("\n\n\n");
    return result;
}

module.exports = parse;
