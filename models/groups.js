// A model for groups

var Group = require('./neo4j/group');

/**
 * Query Functions
 */

//  Returns many groups as an array
function manyGroups(neo4jResult) {
  return neo4jResult.records.map(r => new Group(r.get('group')));
}

// Returns one group
function oneGroup(neo4jResult) {
  return new Group(neo4jResult.records[0].get('group'));
}

//  get: session, <Int>
//  This function consumes a groupId and returns the group found.
var get = (session, groupId) => {
  console.log("this is groupId", groupId);
  return session.run(
    'MATCH (group:Group) WHERE group.id = {groupId} \
    RETURN DISTINCT group',
    {
      groupId: groupId
    })
    .then(r => oneGroup(r));
};

//  getAll: session
//  Returns all groups.
var getAll = (session) => {
  return session.run(
    'MATCH (group:Group) RETURN DISTINCT group'
  )
    .then(r => manyGroups(r));
};

/**
 * Creation Functions
 */

//  create: session, <Int>, <Str>
//  This function consumes a groupId and a name.
//  It creates a new group and names it.
var create = (session, newGroupId, name) => {
  return session.run(
    'CREATE (g:Group {id:{newGroupId}, name:{name}}) RETURN g',
    {
      newGroupId: newGroupId,
      name: name
    }
  );
};

// deleteAll: session
// Deletes all groups
var deleteAll = (session) => {
  return session.run(
    'MATCH (g:Group) DETACH DELETE g'
  );
};

// Export all functions to make them available
module.exports = {
  get: get,
  getAll: getAll,
  create: create,
  deleteAll: deleteAll
};
