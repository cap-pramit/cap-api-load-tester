const runner = require('./runner');
const apiCaller = require('./utils/apiCaller');

const region = (process.argv.length && process.argv.length > 2 && process.argv[2]) || 'in' ;

apiCaller.init(region).then(credentials => {
	runner.init(region).then(config => {
		runner.runLoadTest(config, region);
	}).catch(err => {
		console.error('Test failed with error: ', err);
	});
}).catch(err => {
	console.error('Test failed with authentication error: ', err);
});