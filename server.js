// server.js

// BASE SETUP
// ==================================================================

// call the packages we need
var express     = require('express'),
  app           = express(),
  bodyParser    = require('body-parser');

// custom modules
var nconf       = require('./config'),
  routes        = require('./routes');

var neo4jSessionCleanup = require('./middlewares/neo4jSessionCleanup');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = nconf.get('port') || '3001';

// CUSTOM MIDDLEWARES
// ==================================================================

app.use(neo4jSessionCleanup);

// ROUTES FOR OUR API
// ==================================================================

var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working
// accessed at: GET http://localhost:3001/api
router.get('/', (req, res) => {
  res.json({ message: 'Hi there, welcome to the event-planning api!' });
});

router.get('/alice', routes.alice.Alice);

// REGISTER OUR ROUTES ------------------------------------
// all of our routes will be prefixed with with an api path
app.use(nconf.get('api_path'), router);

// START... THE... SERVER!!!
// ==================================================================
app.listen(port);
console.log('Express server listening on port ' + port);
