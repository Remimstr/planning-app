// extracts just the data from the query results

var _ = require('lodash');

var Person = module.exports = function(_node) {
  _.extend(this, _node.properties);

  if (this.id) {
    this.id = Number(this.id);
  }

  if (this.date) {
    this.date = Number(this.date);
  }
};
