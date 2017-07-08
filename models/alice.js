// An example model. This is what actually runs the cypher command.
// Here, we are creating a new Person with name: Alice and returning
// that person as a response.
var create = function (session) {
  return session.run(
    'CREATE (alice:Person {name : "Alice"}) RETURN alice'
  );
};

// Export all functions to make them available
module.exports = {
  create: create
};
