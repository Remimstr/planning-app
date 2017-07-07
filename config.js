'use strict';

var nconf = require('nconf');

nconf.env(['PORT', 'NODE_ENV'])
  .argv({
    'e': {
      alias: 'NODE_ENV',
      describe: 'Set production or development mode.',
      demand: false,
      default: 'development'
    }
  })
  .defaults({
    'USERNAME': process.env.DATABASE_USERNAME,
    'PASSWORD' : process.env.DATABASE_PASSWORD,
    'neo4j': 'bolt://localhost',
    'port': '3001',
    'api_path': '/api/v0'
  });

module.exports = nconf;
