import React from 'react';
import MainPage from '../src/MainPage';

import renderer from 'react-test-renderer';

/* global it, expect */

it('renders mainpage without crashing', () => {
    let rendered = renderer.create(<MainPage selected="会话" skipLoadAssets />);
    expect(rendered.toJSON()).toBeTruthy();
    rendered.getInstance().onPress0();
    rendered.getInstance().onPress1();
    rendered.getInstance().onPress2();
    rendered.getInstance().onPress3();

    rendered = renderer.create(<MainPage selected="通讯录" skipLoadAssets />).toJSON();
    expect(rendered).toBeTruthy();

    rendered = renderer.create(<MainPage selected="发现" skipLoadAssets />).toJSON();
    expect(rendered).toBeTruthy();

    rendered = renderer.create(<MainPage selected="我" skipLoadAssets />).toJSON();
    expect(rendered).toBeTruthy();
});
