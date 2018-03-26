import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

/* global it, expect */

it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
});
