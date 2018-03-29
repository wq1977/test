import React from 'react';
import WalletPage from '../src/WalletPage';

import renderer from 'react-test-renderer';
import wallet from '../src/lib/wallet';

/* global it, expect */

it('renders wallet page without crashing', async () => {
    let rendered = renderer.create(<WalletPage navigator={{ pop: ()=>{} }} />);
    expect(rendered.toJSON()).toBeTruthy();
    rendered.getInstance().copyToClipboard();
    await wallet.loadAccounts();
    wallet.newAccount();
    await wallet.refreshAllBalance();
    rendered = renderer.create(<WalletPage navigator={{ pop: ()=>{} }} />);
    rendered.getInstance().copyToClipboard();
    rendered.getInstance().sendEth();
    expect(rendered.toJSON()).toBeTruthy();    
});
