// people.js
var People =         require('../models/people'),
  _ =                require('lodash'),
  dbUtils =          require('../neo4j/dbUtils'),
  utils =            require('../helpers/utils'),
  writeResponse =    require('../helpers/response').writeResponse;

// creates a new person node
exports.create = (req, res, next) => {
  var name = (_.get(req.body, 'name')),
    id = Number(req.params.personId);
  utils.isDefined(name, 'name');
  utils.stringCheck(name, 'name');
  utils.numberCheck(id, 'personId');

  People.create(dbUtils.getSession(req), id, name)
    .then (response => writeResponse(res, response))
    .catch (next);
};

// gets a single person node
exports.get = (req, res, next) => {
  var id = Number(req.params.personId);
  utils.numberCheck(id, 'personId');

  People.get(dbUtils.getSession(req), id)
    .then (response => writeResponse(res, response))
    .catch (next);
};

// gets all people nodes
exports.getAll = (req, res, next) => {
  People.getAll(dbUtils.getSession(req))
    .then (response => writeResponse(res, response))
    .catch (next);
};

// deletes all people nodes and relationships
exports.deleteAll = (req, res, next) => {
  People.deleteAll(dbUtils.getSession(req))
    .then(response => writeResponse(res, response))
    .catch(next);
};
