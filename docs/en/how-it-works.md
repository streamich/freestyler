# How it Works

`freestyler` uses many different strategies to render your CSS.


## Static Styles

If `freestyler` knows some styles are *static*, i.e. those component
styles never change, `freestyler` will inject them into the page only
once and only JIT when used for the first time; and cache them.
So that when another component of the same type renders it will simply
fetch a class name string from the cache.


## Dynamic Styles

Dynamic styles of a component are ones that change over time, either because
of `props` change or any other reason. Dynamic styles are split into three groups
according to their *"cacheability"*:

- Low Cardinality
- High Cardinality
- Infinite Cardinality

Each cardinality group styles are injected into the DOM using the best strategy.


### Low Cardinality

Low Cardinality styles are ones that don't have much variation. For example, the
`display` CSS property can just have a handful of different possible values:

```
display: block;
display: inline;
display: none;
/* etc... */
```

Because there is not much variation in Low Cardinality styles they are all grouped
together and injected with a single class name.


### High Cardinality

High Cardinality are styles are those that have higher variation than Low
Cardinality styles but still not infinitely high.

For example, if you consider `width` property, in theory it can be assigned infinitely
many different values. However, in practice we consider all `px` values and integer
`%` values to have high cardinality, not infinite. Because there are on average ±2,000
different `px` values it can take, as usual screen sizes are up to 2,000 pixels wide;
and only around 100 different integer `%` can be assigned to it. All in all, the `width`
property cardinality according to these rules is no greater than a couple of thousand.

So, all values that have cardinality around few thousand are considered *High Cardinality*
and are cached forever using &mdash; what some call &mdash; [Virtual CSS](https://ryantsao.com/blog/virtual-css-with-styletron)
strategy. Each style property-value tuple in High Cardinality group is assigned a unique class name.


### Infinite Cardinality

Infinite Cardinality styles are ones whose values can take more that few thousand different
values. For example, the `color` property can take billions of different values.

```
color: #123456;
```

Infinite Cardinality styles are split into two groups and treated accordingly.

- Static Infinite Cardinality
- Dynamic Infinite Cardinality


#### Static Infinite Cardinality

First, all Infinite Cardinality styles are grouped into a single *static* group. And injected
into the DOM as a single rule. This allows to share that single rule across all components
of one type. If those styles never change all components of that type will simply reuse
one shared CSS selector.

> Static Infinite Cardinality styles are shared across all components of
> a single type.

When some style of Static Infinite Cardinality group changes, it is removed from the group and
instead placed into Dynamic Infinite Cardinality group.


#### Dynamic Infinite Cardinality

Dynamic Infinite Cardinality styles are basically style from Static Infinite Cardinality group
but which changed over time. This group does not belong to a component type but rather to an
individual component instance, because every component instance can have different values for
these styles.

Dynamic Infinite Cardinality styles are treated differently depending on whether the component's
DOM element is known, whether the styles can be applied as inline styles, and whether CSS Custom
Properties are supported.

If styles can be applied as inline styles and component's DOM element is known, `freestyler` will
apply them as inline style. If styles cannot be applied as inline styles, `freestyler` will inject
them into a `CSSStyleSheet`.

If CSS Custom Properties are supported, `freestyler` will replace all style values by *"CSS variables"*.
This allows on subsequent re-renders to simply change CSS variables, whithout re-rendering the styles.

If component's DOM element is known, `freestyler` will create CSS variables on that element. Otherwise,
`freestyler` will create global root CSS variables.
