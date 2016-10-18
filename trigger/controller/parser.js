"use strict";
function parse(data){
    var result = "failure";

    // Split Test and Analysis Logs
    var testData = data.split("TEST:Start")[1].split("TEST:Finished")[0];
    var analysisData = data.split("ANALYSIS:Start")[1].split("ANALYSIS:Finished")[0];
    
    // Compute Status
    var testStatus = checkTests(testData);
    var analysisStatus = checkAnalysis(analysisData);

    result = (testStatus && analysisStatus);
    return result;
}


function checkTests(data) {
    // Check Tests
    var testRegex = /# tests (\d+)/g;
    var passRegex = /# pass  (\d+)/g;

    var tests = data.match(testRegex);
    var passes = data.match(passRegex);

    var testCount = 0;
    for (var index in tests) {
        testCount += Number.parseInt(tests[index].split("# tests ")[1]);
    }

    var passCount = 0;
    for (var index in passes) {
        passCount += Number.parseInt(passes[index].split("# pass  ")[1]);
    }

    console.log(testCount, passCount);

    var testStatus = (testCount == passCount);

    // Check Coverage

    return testStatus;

}

function checkAnalysis(data) {
    return true;
}

var testString = require('fs').readFileSync('./temp.txt', 'utf8');
console.log(checkTests(testString));
