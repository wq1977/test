import './fixws.js';
import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

/* global it, expect, jest */

jest.useFakeTimers();
it('renders root app should not crashing', (done) => {
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
