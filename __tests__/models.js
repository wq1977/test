import { store } from '../src/lib/models';


/* global describe, it,expect */
describe('Our Data Model', () => {
    it('basic reducers', () => {
        store.dispatch({
            type: 'save',
            payload: {
                test: 'test'
            }
        });
        expect(store.getState().test).toBe('test');

        store.dispatch({
            type: 'room keyid',
            payload: {
                keyid: 'test',
                room: {
                    key: 'testkey'
                }
            }
        });

        store.dispatch({
            type: 'save',
            payload: {
                chatrooms: [
                    { key: 'testkey_not_exists' },
                    { key: 'testkey' }
                ]
            }
        });

        store.dispatch({
            type: 'room keyid',
            payload: {
                keyid: 'test',
                room: {
                    key: 'testkey'
                }
            }
        });
        expect(store.getState().chatrooms[1].keyid).toBe('test');

        store.dispatch({
            type: 'room keyid',
            payload: {
                keyid: 'not exists',
                room: {
                    key: 'testkey'
                }
            }
        });

        store.dispatch({
            type: 'new message',
            payload: {
                msg: 'test',
            }
        });
        expect(store.getState().messages[0]).toBe('test');
    });

});
