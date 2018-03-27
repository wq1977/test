import React from 'react';
import MainPage from '../src/MainPage';

import renderer from 'react-test-renderer';
import wallet from '../src/lib/wallet';

/* global it, expect,jest */

jest.useFakeTimers();
it('renders mainpage without crashing', () => {
    let rendered = renderer.create(<MainPage selected="会话" navigator={{push:()=>{}}} />);
    jest.clearAllTimers();
    expect(rendered.toJSON()).toBeTruthy();
    rendered.getInstance().onPress0();
    rendered.getInstance().onPress1();
    rendered.getInstance().onPress2();
    rendered.getInstance().onPress3();
    rendered.getInstance().checkWallet();
    wallet.newAccount();
    rendered.getInstance().checkWallet();

    rendered = renderer.create(<MainPage selected="通讯录" />).toJSON();
    expect(rendered).toBeTruthy();

    rendered = renderer.create(<MainPage selected="Tokens" />).toJSON();
    expect(rendered).toBeTruthy();

    rendered = renderer.create(<MainPage selected="我" />).toJSON();
    expect(rendered).toBeTruthy();
});
