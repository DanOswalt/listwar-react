import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ pageTitle, alias }) => (
  <div className="Header">
    <div className="top nes-container is-centered is-dark is-rounded">
      <Link to={"/"}>
        <h2 className="logo">Super ListWar</h2>
      </Link>
      <Link to="/changeName">
        <div>
          <i class="nes-icon is-small star"></i>
            <h6 className="nes-text header-alias">{alias}</h6>
          <i class="nes-icon is-small star"></i>
        </div>
      </Link>
    </div>
    <h4 className="pageTitle">{pageTitle}</h4>
  </div>
)

export default Header