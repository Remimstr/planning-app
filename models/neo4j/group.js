// extracts just the data from the query results

var _ = require('lodash');

var Group = module.exports = function(_node) {
  _.extend(this, _node.properties);

  if (this.id) {
    this.id = Number(this.id);
  }

  if (this.name) {
    this.name = this.name;
  }

};
