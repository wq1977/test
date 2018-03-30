import '../fixws.js';
import React from 'react';

import MainPage from '../src/MainPage';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import wallet from '../src/lib/wallet';

/* global it, expect,jest,describe,beforeEach */

jest.useFakeTimers();

const navigator = {
    pop: () => { },
    push: () => { },
};

const initialState = { output: 100 };
const mockStore = configureStore();
let store, rendered, instance;

describe('MainPage', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        rendered = renderer.create(
            <Provider store={store}>
                <MainPage navigator={navigator} />
            </Provider>);
        instance = rendered.root;
        jest.clearAllTimers();
    });

    it('renders mainpage without crashing', () => {
        expect(rendered.toJSON()).toBeTruthy();
        let mainpages = instance.findAllByType(MainPage);
        expect(mainpages.length).toBe(1);
        const mainpage = mainpages[0].instance;
        mainpage.onPress0();
        mainpage.onPress1();
        mainpage.onPress2();
        mainpage.onPress3();
        mainpage.checkWallet();
        wallet.newAccount();
        mainpage.checkWallet();
    });
});

it('Render MainPage Tab 2', () => {
    store = mockStore(initialState);
    rendered = renderer.create(
        <Provider store={store}>
            <MainPage selected="通讯录" navigator={navigator} />
        </Provider>).toJSON();
    expect(rendered).toBeTruthy();
});

it('Render MainPage Tab 3', () => {
    store = mockStore(initialState);
    rendered = renderer.create(
        <Provider store={store}>
            <MainPage selected="Tokens" navigator={navigator} />
        </Provider>).toJSON();
    expect(rendered).toBeTruthy();
});

it('Render MainPage Tab 4', () => {
    store = mockStore(initialState);
    rendered = renderer.create(
        <Provider store={store}>
            <MainPage selected="我" navigator={navigator} />
        </Provider>).toJSON();
    expect(rendered).toBeTruthy();
});