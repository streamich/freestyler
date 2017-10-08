export const noop = () => {};
export const sym = name => `@@freestyler/${name}`;

export const $$cn = sym('cn');
export const $$cnt = sym('cnt');

export const hidden = (obj, key, value) =>
    Object.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value,
    });
