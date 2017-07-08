// alice.js
var Events =         require('../models/event'),
  _ =                require('lodash'),
  dbUtils =          require('../neo4j/dbUtils'),
  writeResponse =    require('../helpers/response').writeResponse;
  // writeError =      require('../helpers/response').writeError;

// Make one event, not related to any others
exports.createFinal = (req, res, next) => {
  var date = Number(_.get(req.body, 'date')),
    name = (_.get(req.body, 'name'));
  Events.createFinal(dbUtils.getSession(req), req.query.id, name, date)
    .then(response => writeResponse(res, response))
    .catch(next);
};

exports.create = (req, res, next) => {
  var date = Number(_.get(req.body, 'date')),
    name = (_.get(req.body, 'name'));
  Events.create(dbUtils.getSession(req), req.query.id, req.query.parent, name, date)
    .then(response => writeResponse(res, response))
    .catch(next);
};
