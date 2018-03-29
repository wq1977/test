import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

export const saga = createSagaMiddleware();
export const store = createStore((state={}, action) => {
    if (action.type === 'save'){
        return { ...state, ...action.payload };
    } else if (action.type === 'chatrooms') {
        const chatrooms = action.payload.concat(state.chatrooms || []);
        return {...state, chatrooms};
    } else if (action.type === 'room keyid') {
        let chatrooms = state.chatrooms || [];
        for (let i=0;i<chatrooms.length;i++) {
            if (chatrooms[i].key === action.payload.room.key) {
                chatrooms[i].keyid = action.payload.keyid;
            }
        }
        chatrooms = [].concat(chatrooms);
        return {...state, chatrooms};
    }
    return state;
}, applyMiddleware(saga));

