import React, { Component } from 'react';
import './header.css';
const Header = () => {
    return (
        <div className="header d-flex">
            <h3>
                <a href="#">
                    Star DB
                   </a>
            </h3>
            <ul className="d-flex main-menu">
                <li className="main-menu-item">
                    <a href="#">People</a>
                </li>
                <li className="main-menu-item">
                    <a href="#">Planets</a>
                </li>
                <li className="main-menu-item">
                    <a href="#">Starships</a>
                </li>
            </ul>
        </div>
    );
}

export default Header;