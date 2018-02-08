import {ClientSheet} from './client';
import {ServerSheet} from './server';
import {isClient} from '../../util';

let Sheet: new (...args) => ClientSheet = ClientSheet;

if (!isClient) {
    Sheet = ServerSheet as any;
}

export {Sheet};
