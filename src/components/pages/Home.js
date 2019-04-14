import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ guest, username }) => {
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
          <li><Link to="mylists"><button className="nes-btn menu-btn">My Lists</button></Link></li>
          <li><Link to="examples"><button className="nes-btn menu-btn">Examples</button></Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Home