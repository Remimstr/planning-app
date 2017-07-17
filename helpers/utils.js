var _ =  require('lodash');

exports.strToNumArray = (arr) => {
  return _.map(arr[0].split(','), (x => Number(x)));
};
