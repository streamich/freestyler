export const sym = name => `@@freestyler/${name}`;

export const $$css = sym('css');

export const hidden = (obj, key, value) =>
    Object.defineProperty(obj, key, {
        enumerable: false,
        writable: true,
        value,
    });
