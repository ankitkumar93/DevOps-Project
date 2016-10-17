## Build
echo "SETUP:Start"
git clone https://github.com/vipulkashyap111/calculator
cd calculator
npm install
echo "SETUP:Finished"

## Testing
echo "TEST:Start"
npm test
istanbul cover test/1-app.js
istanbul cover test/2-calc.js
istanbul cover test/3-postfixer.js
echo "TEST:Finished"

## Analysis
echo "ANALYSIS:Start"
jslint app.js
jslint calc.js
jslint postfixer.js
echo "ANALYSIS:Finished"