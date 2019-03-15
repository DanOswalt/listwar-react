import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ pageTitle, subText }) => (
  <div className="Header">
    <div className="top nes-container is-centered is-dark is-rounded">
      <Link to={"/"}>
        <h3 className="logo">Super ListWar</h3>
      </Link>
    </div>
    <h2 className="pageTitle">{pageTitle}</h2>
    <p className="subText">{subText}</p>
  </div>
)

export default Header