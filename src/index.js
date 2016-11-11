var properties = require('./css-properties.js');
var React = require('react');

var originalConsoleError = console.error;
console.error = () => {
  if (typeof arguments[0] === 'string' && /You are manually calling a React\.PropTypes/.test(arguments[0])) {
    return;
  }
  originalConsoleError.apply(console, arguments);
};

module.exports = function(props, propName, componentName) {
  var styles = props[propName];
  if (!styles) {
    return;
  }
  if (typeof styles !== 'object') {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' isn\'t an object');
  }

  var failures = [];
  Object.keys(styles).forEach(function(styleKey){
    if (properties.indexOf(styleKey) === -1) {
      failures.push(styleKey);
    }
  });
  if (failures.length) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
  }
};

module.exports.isRequired = function(props, propName, componentName) {
  if (!props[propName]) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
  }
  return module.exports(props, propName, componentName);
};

module.exports.supportingArrays = React.PropTypes.oneOfType([
  React.PropTypes.arrayOf(module.exports),
  module.exports
]);

