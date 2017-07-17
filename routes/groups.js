// groups.js
var Groups =         require('../models/groups'),
  _ =                require('lodash'),
  dbUtils =          require('../neo4j/dbUtils'),
  writeResponse =    require('../helpers/response').writeResponse,
  utils =            require('../helpers/utils');
  // writeError =      require('../helpers/response').writeError;

// creates a new group node
exports.create = (req, res, next) => {
  var name = (_.get(req.body, 'name')),
    id = Number(req.params.groupId);

  Groups.create(dbUtils.getSession(req), id, name)
    .then (response => writeResponse(res, response))
    .catch (next);
};

// joins a group node
exports.join = (req, res, next) => {
  var peopleId = utils.strToNumArray(_.get(req.body, 'peopleId')),
    id = Number(req.params.groupId);

  Groups.join(dbUtils.getSession(req), id, peopleId)
    .then (response => writeResponse(res, response))
    .catch (next);
};

// leaves a group node
exports.leave = (req, res, next) => {
  var peopleId = utils.strToNumArray(_.get(req.body, 'peopleId')),
    id = Number(req.params.groupId);

  Groups.leave(dbUtils.getSession(req), id, peopleId)
    .then (response => writeResponse(res, response))
    .catch (next);
};

// gets a single group node
exports.get = (req, res, next) => {
  var id = Number(req.params.groupId);

  Groups.get(dbUtils.getSession(req), id)
    .then (response => writeResponse(res, response))
    .catch (next);
};

// gets all group nodes
exports.getAll = (req, res, next) => {
  Groups.getAll(dbUtils.getSession(req))
    .then (response => writeResponse(res, response))
    .catch (next);
};

// deletes all Event nodes and relationships
exports.deleteAll = (req, res, next) => {
  Groups.deleteAll(dbUtils.getSession(req))
    .then(response => writeResponse(res, response))
    .catch(next);
};
