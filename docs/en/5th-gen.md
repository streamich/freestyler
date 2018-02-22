# 5<sup>th</sup> Generation Interfaces

5<sup>th</sup> generation interfaces are more dynamic than [4<sup>th</sup> generation interfaces](./4th-gen.md),
not only have they access to variables in component's scope, but they also have access to variables in component's
`.render()` function scope.

> 5<sup>th</sup> gen CSS interface can use `.render()` function's scope variables, such as arguments received from
> [render props](https://mailonline.github.io/libreact/en/Introduction.html#render-props) and [FaCC](https://mailonline.github.io/libreact/en/Introduction.html#facc)s.

`freestyler` provides these 5<sup>th</sup> generation interfaces:

- [`styleit()` and `<Styleit>` Interfaces](./styleit.md)
- [`jsxstyle()`, `<Block>`, `<Inline>`, `<InlineBlock>`, `<Row>`, and `<Column>` Interfaces](./jsxstyle.md)
