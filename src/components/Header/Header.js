import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <div className="Header">
      <NavLink to={'/plotme/index'}>
        <h1>plot<span className="header-span">me</span></h1>
      </NavLink>
    </div>
  )
}

export default Header;