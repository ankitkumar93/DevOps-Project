## Build
echo "SETUP:Start"
git clone https://github.com/vipulkashyap111/calculator
cd calculator
npm install
echo "SETUP:Finished"

## Testing
echo "TEST:Start"
## Basic Testing with Coverage
istanbul cover test/1-calc.js
istanbul cover test/2-postfixer.js
istanbul cover test/3-app.js

## Advanced Testing with Coverage
node advanced_testing.js
istanbul cover test.js
echo "TEST:Finished"

## Analysis
echo "ANALYSIS:Start"

## Static Analysis
jshint app.js
jshint calc.js
jshint postfixer.js

## Custom Metrics
node analysis.js app.js
node analysis.js calc.js
node analysis.js postfixer.js
echo "ANALYSIS:Finished"