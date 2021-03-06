/*
* Create and export config variables
*
*/

// Container for all enviornments
var environments = {};

// Staging default environment
environments.staging = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'evnName' : 'staging'
}


// Production environment
environments.production = {
    'httpPort' : 8090,
    'httpsPort' : 8091,
    'evnName' : 'production'
}


// Determine which environment was passed by command line argument
var currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

// Check that the current env is one of the environments above, if not, default to staging
var environmentToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;

module.exports = environmentToExport;