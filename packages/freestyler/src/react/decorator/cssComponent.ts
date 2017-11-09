import transformCssComponent from '../transform/cssComponent';

/**
 * Ideas of this decorator to allow the same syntax as `CssComponent` from `../Component`,
 * but without the need to extend that component.
 */
const decoratorCssComponent = Comp => {
    const {prototype} = Comp;
    const componentWillMount_ = prototype.componentWillMount;

    prototype.componentWillMount = function() {
        transformCssComponent(this);
        if (componentWillMount_) componentWillMount_.apply(this, arguments);
    };
};

export default decoratorCssComponent;
