"use strict";
function parse(data){
    var result = "failure";

    // Split Test and Analysis Logs
    var testData = data.split("TEST:Start")[1].split("TEST:Finished")[0];
    var analysisData = data.split("ANALYSIS:Start")[1].split("ANALYSIS:Finished")[0];
    
    // Compute Status
    var testStatus = checkTests(testData);
    var analysisStatus = checkAnalysis(analysisData);

    if (testStatus && analysisStatus)
        result = "success";

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
    var branchThreshold = 0;

    var statementRegex = /Statements   : (\d+)(\.\d+)?%/g;
    var branchRegex =    /Branches     : (\d+)(\.\d+)?%/g;

    var statements = data.match(statementRegex);
    var branches = data.match(branchRegex);
    
    var coverageStatus = true;
    for (var index in statements) {
        var value = Number.parseInt(statements[index]
                                    .split("Statements   : ")[1]
                                    .split("%")[0]);

        coverageStatus = coverageStatus && (value >= statementThreshold);
    }

    for (var index in branches) {
        var value = Number.parseInt(branches[index]
                                    .split("Branches     : ")[1]
                                    .split("%")[0]);

        coverageStatus = coverageStatus && (value >= branchThreshold);
    }


    return testStatus && coverageStatus;

}

function checkAnalysis(data) {
    var analysisStatus = true;
    
    // Lint
    var lintThreshhold = 20;
    var lintRegex = /.js: /g;
    var lints = data.match(lintRegex);
    analysisStatus = analysisStatus && (lints == null || lints.length < lintThreshhold);

    // Custom Metrics
    var methodLengthLimit = 50;
    var maxConditionsLimit = 7;
    var tokensDetectionValue = "false";

    var methodLengthRegex = /MethodLength: (\d+)/g;
    var maxConditionsRegex = /MaxConditions: (\d+)/g;
    var tokenDetectedRegex = /Token Status:\n==============\nDetected: (\w+)/g;

    var methodLengths = data.match(methodLengthRegex);
    var maxConditions = data.match(maxConditionsRegex);
    var tokensDetected = data.match(tokenDetectedRegex);

    for (var index in methodLengths) {
        var value = Number.parseInt(methodLengths[index].split("MethodLength: ")[1]);
        analysisStatus = analysisStatus && (value <= methodLengthLimit);
    }

    for (var index in maxConditions) {
        var value = Number.parseInt(maxConditions[index].split("MaxConditions: ")[1]);
        analysisStatus = analysisStatus && (value <= maxConditionsLimit);
    }

    for (var index in tokensDetected) {
        var value = tokensDetected[index].split("Detected: ")[1];

        analysisStatus = analysisStatus && (value == tokensDetectionValue);
    }

    return analysisStatus;
}

module.exports = parse;