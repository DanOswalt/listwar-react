import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ alias }) => {
  return (
    <div className="Home">
      <div className="home-logo nes-container is-centered is-dark is-rounded">
        <Link className="logo" to={"/"}>
          <h2>Super</h2>
          <h2>ListWar</h2>
        </Link>
      </div>
      <div className="home-menu-box">
        <ul className="home-menu">
          <li><Link to="create"><button className="nes-btn menu-btn">Create New</button></Link></li>
          <li><Link to="myLists"><button className="nes-btn menu-btn">My Lists</button></Link></li>
        </ul>
      </div>
      <Link to="changeName">
        <div className="alias-box">
          <h6 className="alias-label nes-text">Playing as:</h6>
          <i className="nes-icon is-small star"></i>
          <span className="nes-text alias">{alias}</span>
          <i className="nes-icon is-small star"></i>
        </div>
      </Link>
    </div>
  )
}

export default Home