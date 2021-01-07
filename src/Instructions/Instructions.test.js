import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Instructions from './Instructions';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Instructions /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});