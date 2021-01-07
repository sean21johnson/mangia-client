import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import MealItem from './MealItem';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><MealItem /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});