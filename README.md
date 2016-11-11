Validates style objects by ensuring the keys are valid css property names (in camelcase form).


```js
var stylePropType = require('react-style-proptype');

var Comp = React.createClass({
  propTypes: {
    myStyle: stylePropType,
  },
  render(){ ... }
});
```

You can use stylePropType.isRequired similar to the built in proptypes.


## Arrays

With react-native styles can be passed an array of objects. You can use this variant with
`stylePropTypes.supportingArrays`.

