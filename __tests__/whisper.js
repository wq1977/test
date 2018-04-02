
import '../fixws.js';
import '../src/lib/whisper';
import { store } from '../src/lib/models';

/* global describe, it,expect */
function timeout(duration) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(duration);
        }, duration);
    });
}

describe('Whisper back logic', () => {
    it('hash', () => {
        expect('abc'.hash()).toBe('0x90015098');
    });
    it('post', function* () {
        yield timeout(3000);
        const rooms = store.getState().chatrooms;
        expect(rooms[0].keyid).toBeTruthy();
        store.dispatch(
            {
                type: 'whisper',
                payload: {
                    cnt: 'hi',
                    room: {
                        item: rooms[0],
                    },
                }
            }
        );
        yield timeout(1000);
        const messages = store.getState().messages;
        expect(messages.length).toBe(1);
    });
});
