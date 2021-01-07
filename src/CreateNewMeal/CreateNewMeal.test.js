import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import CreateNewMeal from './CreateNewMeal';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><CreateNewMeal /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});