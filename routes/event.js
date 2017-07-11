// alice.js
var Events =         require('../models/event'),
  _ =                require('lodash'),
  dbUtils =          require('../neo4j/dbUtils'),
  writeResponse =    require('../helpers/response').writeResponse;
  // writeError =      require('../helpers/response').writeError;

// creates a new event node and associated event relationships
// 3 Scenarios:
// - Final Node (no children, no parents)
//    => Creates a node with no children or parents
// - First Intermediate Node (1 child)
//    => Creates a node and connects it to the child
// - nth Intermediate Node (1 parent)
//    => Creates a node, becomes the child of parent,
//       and becomes the parent of parent's child
exports.create = (req, res, next) => {
  var date = Number(_.get(req.body, 'date')),
    name = (_.get(req.body, 'name')),
    child = (_.get(req.body, 'childId')) || null,
    parent = (_.get(req.body, 'parentId')) || null,
    curr = Number(req.query.id);
  // Scenario #1: Final Node
  if (parent === null && child === null) {
    console.log('final node');
    Events.create(dbUtils.getSession(req), curr, name, date)
      .then (response => writeResponse(res, response))
      .catch (next);
  // Scenario #2: First Intermediate Node
  } else if (parent === null && child !== null) {
    console.log('first intermediate');
    Events.create(dbUtils.getSession(req), curr, name, date)
      .then (Events.connect(dbUtils.getSession(req), curr, Number(child)))
      .then (response => writeResponse(res, response))
      .catch (next);
  // Scenario #3: nth Intermediate Node
  } else if (parent !== null && child === null) {
    console.log('nth intermediate');
    Events.create(dbUtils.getSession(req), curr, name, date)
      .then (Events.reconnect(dbUtils.getSession(req), curr, Number(parent)))
      .then (response => writeResponse(res, response))
      .catch (next);
  }

};

// deletes all Event nodes and relationships
exports.deleteAll = (req, res, next) => {
  Events.deleteAll(dbUtils.getSession(req))
    .then(response => writeResponse(res, response))
    .catch(next);
};
