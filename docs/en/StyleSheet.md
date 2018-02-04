# `StyleSheet` Interface

`StyleSheet` interface is similar to to [`rule`](./rule.md) interface, but instead of creating
a single "rule" you create a collection of rules for any logical unit you need in your component.

__Example__

```jsx
import StyleSheet from 'freestyler/lib/StyleSheet';

const styles = StyleSheet.create({
    button: {
      background: 'tomato',
    },
    link: {
      border: '1px solid tomato'
    }
});

<div>
    <button className={styles.button}>Hello</button>
    <a className={styles.link}>world!</a>
</div>
```

This approach has a couple of advantages over the [`rule`](./rule.md) interface. Firstly, it returns
an object `styles` with `button` and `link` keys you specify that will each hold a string of class
names. Secondly, `StyleSheet` styles evaluate lazily &mdash; the CSS will not be inject into the page
when you create the `style` object. The actual CSS will be insert into the page when you reference
a "style", like `styles.button` for the first time.
