import toStyleSheet from '../toStylesheet';

describe('toStylesheet', () => {
    it('simple example', () => {
        const styles = {
            '.test': {
                color: 'red',
            },
        };
        const stylesheet = toStyleSheet(styles);
        expect(stylesheet).toEqual([['.test', [['color', 'red']]]]);
    });

    it('inline stylesheet', () => {
        const styles = {
            '#id': {
                color: 'tomato',
                backgroundColor: 'red',
                width: '100%',
            },
        };
        expect(toStyleSheet(styles)).toMatchSnapshot();
    });

    it('multiple rules and expands atoms', () => {
        const styles = {
            '#id': {
                color: 'tomato',
                backgroundColor: 'red',
                width: '100%',
            },
            '.more': {
                color: 'tomato',
                backgroundColor: 'red',
            },
        };
        expect(toStyleSheet(styles)).toMatchSnapshot();
    });

    it('expands atoms', () => {
        const styles = {
            '.more': {
                col: 'red',
                bg: 'blue',
            },
        };
        expect(toStyleSheet(styles)).toMatchSnapshot();
    });

    it('nested structures', () => {
        const styles = {
            '#id': {
                '&.nested': {
                    color: 'yellow',
                },
            },
        };
        expect(toStyleSheet(styles)).toMatchSnapshot();
    });

    it('nested structures', () => {
        const styles = {
            '#id': {
                $nested: {
                    color: 'yellow',
                },
            },
        };
        expect(toStyleSheet(styles)).toMatchSnapshot();
    });
});
