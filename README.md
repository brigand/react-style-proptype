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


