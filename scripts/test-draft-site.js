// after Netlify deploys preview / draft site
// we save deploy results in `deploy.json` file (see Netlify GH workflow)
// now we grab that file and run Cypress tests against it
// see https://github.com/netlify/cli/blob/master/src/commands/deploy.js
const path = require('path')
const filename = path.join(process.cwd(), 'deploy.json')
console.log('loading Netlify deploy results from file %s', filename)
const deploy = require(filename)
console.log('will run Cypress tests against deployed url', deploy.deploy_url)

const cypress = require('cypress')
cypress
	.run({
		config: {
			baseUrl: deploy.deploy_url,
		},
	})
	.then(results => {
		if (results.failures) {
			// really bad crash or cannot run tests
			console.error(results.message)
			process.exit(results.failures)
		}
		process.exit(results.totalFailed)
	})
