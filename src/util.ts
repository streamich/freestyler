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

const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const REVERSE_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g;

export function kebabCase(str) {
    return str.replace(KEBAB_REGEX, match => '-' + match.toLowerCase());
}

export function camelCase(str) {
    return str.replace(REVERSE_REGEX, match => match.slice(1).toUpperCase());
}

export const isClient = typeof window === 'object';
