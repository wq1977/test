import React from 'react';
import WalletPage from '../src/WalletPage';

import renderer from 'react-test-renderer';
import wallet from '../src/lib/wallet';
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

const dummyGetBalance = new Promise(
    (resolve) => {
        resolve(100);
    }
);

it('renders wallet page without crashing', async () => {
    store = mockStore(initialState);
    rendered = renderer.create(
        <Provider store={store}>
            <WalletPage navigator={navigator} />
        </Provider>);
    expect(rendered.toJSON()).toBeTruthy();
    let walletpages = rendered.root.findAllByType(WalletPage);
    expect(walletpages.length).toBe(1);
    let walletpage = walletpages[0].instance;
    walletpage.copyToClipboard();
    await wallet.loadAccounts();
    wallet.newAccount();

    wallet.wallets.forEach((item)=>{
        item.getBalance = dummyGetBalance;
    });

    await wallet.refreshAllBalance();

    rendered = renderer.create(
        <Provider store={store}>
            <WalletPage navigator={navigator} />
        </Provider>);
    expect(rendered.toJSON()).toBeTruthy();    
    walletpages = rendered.root.findAllByType(WalletPage);
    walletpage = walletpages[0].instance;
    walletpage.copyToClipboard();
    walletpage.sendEth();
});
