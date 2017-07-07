// alice.js
var Alice =         require('../models/alice'),
    dbUtils =       require('../neo4j/dbUtils'),
    writeResponse = require('../helpers/response').writeResponse,
    writeError =    require('../helpers/response').writeError;

// Example route, this is where the request gets passed to
// from the server.
exports.Alice = (req, res, next) => {
  Alice.create(dbUtils.getSession(req))
    .then(response => writeResponse(res, response))
    .catch(next);
};
