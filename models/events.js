// A model for events

var Event = require('./neo4j/event');

/**
 * Query Functions
 */

//  Returns many events as an array
function manyEvents(neo4jResult) {
  return neo4jResult.records.map(r => new Event(r.get('event')));
}

//  children: session, <Int>
//  Returns all children for an event with Id of EventId
var children = (session, eventId) => {
  return session.run(
    'MATCH (e:Event {id:{eventId}})-[:CHILD*]->(event) \
    RETURN DISTINCT event',
    {
      eventId: eventId
    })
    .then(r => manyEvents(r));
};

//  parents: session, <Int>
//  Returns all parents for an event with Id of EventId
var parents = (session, eventId) => {
  return session.run(
    'MATCH (e:Event {id:{eventId}})<-[:CHILD]-(event) \
    RETURN DISTINCT event',
    {
      eventId: eventId
    })
    .then(r => manyEvents(r));
};

//  create: session, <Int>, <Int>, <Str>, <Int>
//  This function consumes an eventId, a name, a date,
//  and an eventId. It creates a new event.
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

// connectToChild: session, <Int>, <Int>
// This function consumes two event ids. It connects
// the first event to the second using the '[:CHILD]'
// connector.
var connectToChild = function (session, parentEventId, newEventId) {
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

// connectToChildAndParent: session, <Int>, <Int>
// This function consumes two event ids. It connects
// the first event to the second using the '[:CHILD]'
// connector.
var connectToPAC = function (session, newEventId, parentEventId, childEventId) {
  return session.run(
    'MATCH (p:Event) WHERE p.id = {parentEventId} \
    MATCH (curr:Event) WHERE curr.id = {newEventId} \
    MATCH (c:Event) WHERE c.id = {childEventId} \
    CREATE (p)-[:CHILD]->(curr) \
    CREATE (curr)-[:CHILD]->(c) RETURN p, c, curr',
    {
      parentEventId: parentEventId,
      newEventId: newEventId,
      childEventId: childEventId
    }
  );
};

// reconnectParent: session, <Int>, <Int>
// This function consumes two event ids. It connects
// the [:CHILD] of the second event as the [:CHILD] of
// the first and deletes the original relationship.
var reconnectParent = function (session, childEventId, parentEventId) {
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

// deleteAll: session
// Deletes all events
var deleteAll = (session) => {
  return session.run(
    'MATCH (n:Event) DETACH DELETE n'
  );
};

// Export all functions to make them available
module.exports = {
  children: children,
  parents: parents,
  create: create,
  connectToChild: connectToChild,
  connectToPAC: connectToPAC, 
  reconnectParent: reconnectParent,
  deleteAll: deleteAll
};
