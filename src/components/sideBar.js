import React from 'react';
import { slide as Menu } from 'react-burger-menu';

const url = window.location.origin

export default props => {
    return (
        <Menu>
            <a className="menu-item" href={url + '/home'}>
                Home
            </a>
            <a className="menu-item" href={url + '/machinelearning'}>
                Salads
            </a>
            <a className="menu-item" href={url + '/webscraping'}>
                Pizzas
            </a>
            <a className="menu-item" >
                About
            </a>
        </Menu>
    );
};
