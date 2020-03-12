// after Netlify deploys the production site
// we save deploy results in `deploy.json` file (see Netlify GH workflow)
// now we grab that file and run some Cypress tests against it
const path = require('path')
const filename = path.join(process.cwd(), 'deploy.json')
console.log('loading Netlify deploy results from file %s', filename)
const deploy = require(filename)

const baseUrl = deploy.url || deploy.deploy_url
console.log('will run Cypress tests against deployed url: %s', baseUrl)

const cypress = require('cypress')
cypress
	.run({
		// only run tests safe against data modification
		// and with minimal network stubbing
		spec: 'cypress/integration/prod-spec.js',
		config: {
			baseUrl,
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
