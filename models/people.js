// A model for people

var Person = require('./neo4j/person');

/**
 * Query Functions
 */

//  Returns many groups as an array
function manyPeople(neo4jResult) {
  return neo4jResult.records.map(r => new Person(r.get('person')));
}

// Returns one group
function onePerson(neo4jResult) {
  return new Person(neo4jResult.records[0].get('person'));
}

//  get: session, <Int>
//  This function consumes a personId and returns the person found.
var get = (session, personId) => {
  return session.run(
    'MATCH (person:Person) WHERE person.id = {personId} \
    RETURN DISTINCT person',
    {
      personId: personId
    })
    .then(r => onePerson(r));
};

//  getAll: session
//  Returns all people.
var getAll = (session) => {
  return session.run(
    'MATCH (person:Person) RETURN DISTINCT person'
  )
    .then(r => manyPeople(r));
};

/**
 * Creation Functions
 */

//  create: session, <Int>, <Str>
//  This function consumes a personId and a name.
//  It creates a new person and names it.
var create = (session, newPersonId, name) => {
  return session.run(
    'CREATE (p:Person {id:{newPersonId}, name:{name}}) RETURN p',
    {
      newPersonId: newPersonId,
      name: name
    }
  );
};

// deleteAll: session
// Deletes all people
var deleteAll = (session) => {
  return session.run(
    'MATCH (p:Person) DETACH DELETE p'
  );
};

// Export all functions to make them available
module.exports = {
  get: get,
  getAll: getAll,
  create: create,
  deleteAll: deleteAll
};
