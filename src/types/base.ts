export type TComponentType<P> = React.ComponentClass<P> | React.StatelessComponent<P>;
export type TComponentTag<P> = string | TComponentType<P> | ((props?, state?, context?) => any);
export type THoc<A, B> = (tag: TComponentTag<A>) => TComponentType<B>;
