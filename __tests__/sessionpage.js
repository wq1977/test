import React from 'react';
import SessionPage from '../src/SessionPage';

import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Swipeout from 'react-native-swipeout';

/* global it, expect */

const navigator = {
    pop: () => { },
    push: () => { },
};

const initialState = { chatrooms: [
    {title:'hehe', key: 0}
] };
const mockStore = configureStore();
let store, rendered;

it('renders NewWalletPage without crashing', async () => {
    store = mockStore(initialState);
    rendered = renderer.create(
        <Provider store={store}>
            <SessionPage navigator={navigator} />
        </Provider>);
    expect(rendered.toJSON()).toBeTruthy();

    let pages = rendered.root.findAllByProps(initialState);
    expect(pages.length).toBe(1);
    const page = pages[0].instance;
    page.jumpToConversion({item:initialState.chatrooms[0]});

    let subcomps= rendered.root.findAllByType(Swipeout);
    expect(subcomps.length).toBe(1);
    subcomps[0].props.onOpen();
    subcomps[0].props.onClose();

    //page.say();
    //page.onInputTextChange('dummy');
});
