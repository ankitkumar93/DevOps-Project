"use strict";

/**
*This is a sample app to test build server
* @author vkkashya@ncsu.edu
*/
function fibonacci(n){
  var ans = [];
  ans[0] = 0;
  ans[1] = 1;
  for(var i = 2; i<=n; i++){
    ans[i] = ans[i-1] - ans[i-2];
  }
  return ans[n];
}

console.log(fibonacci(6));

module.exports = {
  fibonacci: fibonacci
};
