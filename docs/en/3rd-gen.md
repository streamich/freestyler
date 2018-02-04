# 3<sup>rd</sup> Generation Interfaces

3<sup>rd</sup> generation interfaces are when CSS templates are defined at module scope of
your JavaScript files and, thus, have access to variables at the module scope.

This makes *third* gen interface less dynamic than *fourth* or *fifth* but the upside is
that they are library agnostic, you can use *third* gen interfaces with any rendering
library, not just React.

Example

```js
import rule from 'freestyler/lib/rule';
import {color} from './my-theme';

const classNames = rule({
    color: color,
    background: 'yellow',
    border: '1px solid tomato',
});
```

In the example above, you can see the CSS-like object uses `color` module scope variable.
