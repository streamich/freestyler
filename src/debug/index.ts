import createBroadcaster from './createBroadcaster';
import {sym} from '../util';

const broadcaster = createBroadcaster();
const $$debug = sym('debug');
const channel = process.env.FREESTYLER_PREFIX || 'default';

if (!window[$$debug]) {
    window[$$debug] = {};
}

window[$$debug][channel] = broadcaster;

export const emit = action => broadcaster.emit(action);
