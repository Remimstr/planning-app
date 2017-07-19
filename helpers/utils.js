var _ =  require('lodash');

exports.strToNumArray = (arr) => {
  return _.map(arr[0].split(','), (x => Number(x)));
};

exports.numberCheck = (n, param) => {
  if (isNaN(n)) {
    throw TypeError(param + ' is not a Number');
  }
};

exports.stringCheck = (s, param) => {
  if (typeof(s) != 'string') {
    throw TypeError(param + ' is not a String');
  }
};

exports.isDefined = (e, param) => {
  if (e == undefined) {
    throw EvalError(param + ' is not defined');
  }
};
