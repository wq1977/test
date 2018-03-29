import React from 'react';
import NewWalletPage from '../src/NewWalletPage';

import renderer from 'react-test-renderer';
import wallet from '../src/lib/wallet';

/* global it, expect */

it('renders mainpage without crashing', async () => {
    let rendered = renderer.create(<NewWalletPage navigator={{ pop: ()=>{} }} />);
    expect(rendered.toJSON()).toBeTruthy();
    await rendered.getInstance().onPressNewWallet();
    wallet.newAccount();
    await wallet.refreshAllBalance();
    rendered = renderer.create(<NewWalletPage navigator={{ pop: ()=>{} }} />);
    expect(rendered.toJSON()).toBeTruthy();    
});
