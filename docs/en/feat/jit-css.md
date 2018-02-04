### Just-in-time CSS

JIT or *just-in-time* CSS means that `freestyler` will not emit any CSS into the DOM if it is not used.
It emits CSS only when a component is rendered for the first time. It also cleans-up CSS after component
un-mounts (depends on the [renderer](#renderer)), so if you unmount all your React components all the CSS
will disappear as well, magic!