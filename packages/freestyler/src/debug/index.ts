import createBroadcaster from './createBroadcaster';
import {sym} from '../util';

const broadcaster = createBroadcaster();
const $$channelName = sym('debug' + (process.env.FREESTYLER_PREFIX ? '/' + process.env.FREESTYLER_PREFIX : ''));

window[$$channelName] = broadcaster;

export const emit = action => broadcaster.emit(action);

const $$instanceId = sym('debut/instanceId');
let instanceId = 0;

const reducer = (state, action) => {
    const {Comp, instance} = action;
    let name = '';

    if (Comp) {
        name = `<${Comp.displayName || Comp.name || 'Unknown'}>`;

        if (instance) {
            if (!instance[$$instanceId]) {
                instance[$$instanceId] = instanceId++;
            }

            name += `[${instance[$$instanceId].toString(36)}]`;
        }
    }

    switch (action.type) {
        case 'RENDER': {
            return {
                ...state,
                [name]: action.styles,
            };
        }
        case 'UNRENDER': {
            const {[name]: omit, ...rest} = state;

            return rest;
        }
        case 'RENDER_STATIC': {
            return {
                ...state,
                [name]: action.styles,
            };
        }
    }
};

const FreestylerEmitter = (prefix = '') => {
    let state: any = {};
    const channelName = sym('debug' + (prefix ? '/' + prefix : ''));
    const broadcaster = window[channelName];

    if (typeof broadcaster !== 'object') {
        const error = new Error(
            `Freestyler debug channel not found at window['${channelName}'].` +
                `If you are using FREESTYLER_PREFIX env variable, you have to specify` +
                `that in your kuker emitter, like FreestylerEmitter(myPrefix).`
        );

        console.error(error);
    }

    broadcaster.sub(action => {
        state = reducer(state, action);

        window.postMessage(
            {
                kuker: true,
                type: 'FREESTYLER',
                time: new Date().getTime(),
                state,
            },
            '*'
        );
    });
};

FreestylerEmitter();
