# 4<sup>th</sup> Generation Interfaces

4<sup>th</sup> generation interfaces are more dynamic than [3<sup>rd</sup> generation interfaces](./3rd-gen.md),
they are either defined in component's scope or through a template that is "attached" to a component, as such they
get access to variables in component's context, such as *props* and *state*.

> 4<sup>th</sup> gen CSS interface can use component's scope variables, such as *props* and *state*.

`freestyler` provides these 4<sup>th</sup> generation interfaces:

- [`styled()()` Components Interface](./styled.md)
- [`@css` Static Class Decorator Interface](./css-static-class-decorator.md)
- [`@css()` Class Decorator Interface](./css-class-decorator.md)
- [`@css()` Render Method decorator Interface](./css-render-decorator.md)
- [`hoc()()` Generator Interface](./hoc-generator.md)
- [`Component` Class Interface](./component-class.md)
