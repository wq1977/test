import React from 'react';
import NewWalletPage from '../src/NewWalletPage';

import renderer from 'react-test-renderer';

/* global it, expect */

it('renders mainpage without crashing', () => {
    let rendered = renderer.create(<NewWalletPage navigator={{ pop: ()=>{} }} />);
    expect(rendered.toJSON()).toBeTruthy();
    rendered.getInstance().onPressNewWallet();
});
