// A model for events

//  createFinal: session, <Int>, <Str>, <Int>
//  This function consumes an eventId, a name, and a date
//  and creates the final event. There should only be one
//  of these.
var createFinal = function (session, eventId, name, date) {
  return session.run(
    'CREATE (e:Event {id:{eventId}, name:{name}, \
    date:{date}, final:true}) RETURN DISTINCT e',
    {
      eventId: Number(eventId),
      name: name,
      date: date
    }
  );
};

//  create: session, <Int>, <Int>, <Str>, <Int>
//  This function consumes an eventId, a name, a date,
//  and an eventId. It creates a new event which is the
//  child of an existing event. Then, it rebalances the
//  tree.
var create = function (session, newEventId, parentEventId, name, date) {
  return session.run(
    'MATCH (p:Event) WHERE p.id = {parentEventId} \
    CREATE (n:Event {id:{newEventId}, name:{name}, \
    date:{date}})-[:CHILD]->(p) RETURN p, n',
    {
      newEventId: Number(newEventId),
      parentEventId: Number(parentEventId),
      name: name,
      date: date
    }
  );
};

// Export all functions to make them available
module.exports = {
  createFinal: createFinal,
  create: create
};
