import React from 'react';
import NewWalletPage from '../src/NewWalletPage';

import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

/* global it, expect */

const navigator = {
    pop: () => { },
    push: () => { },
};

const initialState = { output: 100 };
const mockStore = configureStore();
let store, rendered;

it('renders NewWalletPage without crashing', async () => {
    store = mockStore(initialState);
    rendered = renderer.create(
        <Provider store={store}>
            <NewWalletPage navigator={navigator} />
        </Provider>);
    expect(rendered.toJSON()).toBeTruthy();

    let newwalletpages = rendered.root.findAllByType(NewWalletPage);
    expect(newwalletpages.length).toBe(1);
    const newwalletpage = newwalletpages[0].instance;

    await newwalletpage.onPressNewWallet();
});
