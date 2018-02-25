const {configure} = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

process.env.NODE_ENV = 'production';

configure({
  adapter: new Adapter()
});

global.requestAnimationFrame = window.requestAnimationFrame = (callback) => setTimeout(callback, 17);
