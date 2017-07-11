// A model for events

// connect: session, <Int>, <Int>
// This function consumes two event ids. It connects
// the first event to the second using the '[:CHILD]'
// connector.
var connect = function (session, parentEventId, newEventId) {
  return session.run(
    'MATCH (p:Event) WHERE p.id = {parentEventId} \
    MATCH (c:Event) WHERE c.id = {newEventId} \
    CREATE (p)-[:CHILD]->(c) RETURN c, p',
    {
      parentEventId: parentEventId,
      newEventId: newEventId
    }
  );
};

// reconnect: session, <Int>, <Int>
// This function consumes two event ids. It connects
// the [:CHILD] of the second event as the [:CHILD] of
// the first and deletes the original relationship.
var reconnect = function (session, childEventId, parentEventId) {
  return session.run(
    'MATCH (p:Event) WHERE p.id = {parentEventId} \
    MATCH (p)-[r:CHILD]->(c2) DELETE r WITH p, c2 \
    MATCH (c:Event) WHERE c.id = {childEventId} \
    CREATE (c)-[:CHILD]->(c2) CREATE (p)-[:CHILD]->(c) \
    RETURN c, c2, p',
    {
      parentEventId: parentEventId,
      childEventId: childEventId
    }
  );
};

//  create: session, <Int>, <Int>, <Str>, <Int>
//  This function consumes an eventId, a name, a date,
//  and an eventId. It creates a new event which is the
//  child of an existing event. Then, it rebalances the
//  tree.
var create = (session, newEventId, name, date) => {
  return session.run(
    'CREATE (n:Event {id:{newEventId}, name:{name}, \
    date:{date}}) RETURN n',
    {
      newEventId: newEventId,
      name: name,
      date: date
    }
  );
};

// deleteAll: session
// Deletes all events
var deleteAll = (session) => {
  return session.run(
    'MATCH (n:Event) DETACH DELETE n'
  );
};

// Export all functions to make them available
module.exports = {
  create: create,
  connect: connect,
  reconnect: reconnect,
  deleteAll: deleteAll
};
