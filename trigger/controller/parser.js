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

    var testStatus = (testCount == passCount);

    // Check Coverage
    var statementThreshold = 30;
    var branchThreshold = 10;

    var statementRegex = /Statements   : (\d+)(\.\d+)?%/g;
    var branchRegex =    /Branches     : (\d+)(\.\d+)?%/g;

    var statements = data.match(statementRegex);
    var branches = data.match(branchRegex);
    
    var analysisStatus = true;
    for (var index in statements) {
        var value = Number.parseInt(statements[index]
                                    .split("Statements   : ")[1]
                                    .split("%")[0]);

        analysisStatus = analysisStatus && (value >= statementThreshold);
    }

    for (var index in branches) {
        var value = Number.parseInt(branches[index]
                                    .split("Branches     : ")[1]
                                    .split("%")[0]);

        analysisStatus = analysisStatus && (value >= branchThreshold);
    }


    return testStatus && analysisStatus;

}

function checkAnalysis(data) {
    return true;
}

var testString = require('fs').readFileSync('./temp.txt', 'utf8');
console.log(checkTests(testString));
