import React from 'react';
import NewWalletPage from '../src/NewWalletPage';

import renderer from 'react-test-renderer';

/* global it, expect */

it('renders mainpage without crashing', (done) => {
    let rendered = renderer.create(<NewWalletPage navigator={{ pop: ()=>{} }} />);
    expect(rendered.toJSON()).toBeTruthy();
    rendered.getInstance().onPressNewWallet();
    // onPressNewWallet was calling async function, we need wait it finish to get 100% coverage
    setTimeout(() => {
        done();
    }, 100);
});
