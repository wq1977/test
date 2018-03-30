import React from 'react';
import ConversionPage from '../src/ConversionPage';

import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

/* global it, expect */

const navigator = {
    pop: () => { },
    push: () => { },
};

const initialState = { messages: [
    {hash:'0xaabb', payload:'0x32'}
] };
const mockStore = configureStore();
let store, rendered;

it('renders NewWalletPage without crashing', async () => {
    store = mockStore(initialState);
    rendered = renderer.create(
        <Provider store={store}>
            <ConversionPage navigator={navigator} />
        </Provider>);
    expect(rendered.toJSON()).toBeTruthy();

    let pages = rendered.root.findAllByProps(initialState);
    expect(pages.length).toBe(1);
    const page = pages[0].instance;
    page.say();
    page.onInputTextChange('dummy');
});
