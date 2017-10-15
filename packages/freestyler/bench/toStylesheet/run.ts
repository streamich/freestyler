var Benchmark = require('benchmark');
import toStylesheet1 from './toStylesheet1';
import toStylesheet2 from './toStylesheet2';

const styles = {
    col: 'red',
    'font-size': '20px',
    bg: 'yellow',
    pos: 'absolute',
    cur: 'pointer',
    '&:hover': {
        col: 'blue',
    },
};

var suite = new Benchmark.Suite();
suite
    .add('toStylesheet1', function() {
        toStylesheet1(styles);
    })
    .add('toStylesheet2', function() {
        toStylesheet2(styles);
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
