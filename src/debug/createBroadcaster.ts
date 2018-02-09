export interface IBroadcaster<T> {
    emit: (mesage: T) => void;
    sub: (listener: (mesasge: T) => void) => (() => void);
}

const createBroadcaster: <T>() => IBroadcaster<T> = () => {
    let listeners = [];

    const emit = message => {
        for (let i = 0; i < listeners.length; i++) {
            listeners[i](message);
        }
    };

    const sub = listener => {
        listeners.push(listener);

        return () => (listeners = listeners.filter(item => item !== listener));
    };

    return {
        emit,
        sub,
    };
};

export default createBroadcaster;
