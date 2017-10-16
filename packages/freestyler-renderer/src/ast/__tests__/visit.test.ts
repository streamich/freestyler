import {TVisitor, visit} from '../visit';
import {TStyleSheet} from '../toStylesheet';

const createStylesheet = () => {
    return [['.foo', [['color', 'red']]]] as TStyleSheet;
};

describe('visit', () => {
    it('visits declaration', () => {
        let propName;
        visit(createStylesheet(), {
            decl: decl => {
                propName = decl[0];
                return decl;
            },
        });
        expect(propName).toBe('color');
    });
});
