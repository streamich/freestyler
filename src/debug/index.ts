import createBroadcaster from './createBroadcaster';
import {sym} from '../util';

const broadcaster = createBroadcaster();
const $$channelName = sym('debug' + (process.env.FREESTYLER_PREFIX ? '/' + process.env.FREESTYLER_PREFIX : ''));

window[$$channelName] = broadcaster;

export const emit = action => broadcaster.emit(action);

const FreestylerEmitter = require('../../../kuker-emitters/lib/FreestylerEmitter');

FreestylerEmitter();
