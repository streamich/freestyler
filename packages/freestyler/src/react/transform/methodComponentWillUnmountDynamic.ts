import {cloneElement} from 'react';
import {TCssDynamicTemplate} from 'freestyler-renderer/src/types';
import {$$el} from './util';
import renderer from '../../renderer';

const transformMethodComponentWillUnmountDynamic = prototype => {
    const componentWillUnmount_ = prototype.componentWillUnmount;

    prototype.componentWillUnmount = function() {
        if (componentWillUnmount_) componentWillUnmount_.apply(this, arguments);
        renderer.unrender(this.constructor, this, this[$$el]);
    };
};

export default transformMethodComponentWillUnmountDynamic;
