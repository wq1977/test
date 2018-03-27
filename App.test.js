import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

/* global it, expect, jest */

jest.useFakeTimers();
it('renders without crashing', (done) => {
    const render = renderer.create(<App />);
    jest.clearAllTimers();
    const instance = render.getInstance();
    instance.dummyConsole();
    const rendered = render.toJSON();
    expect(rendered).toBeTruthy();
    instance._loadAssetsAsync()
        .then(() => {
            done();
        });
});
