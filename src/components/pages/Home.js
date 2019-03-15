import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ guest, username }) => {
  return (
    <div className="Home">
      <div className="home-logo nes-container is-centered is-dark is-rounded">
        <Link className="logo" to={"/"}>
          <h1>Super</h1>
          <h1>ListWar</h1>
        </Link>
      </div>
      <div className="home-menu-box">
        <ul className="home-menu">
          <li><Link to="examples"><button className="nes-btn menu-btn">War A List</button></Link></li>
          <li><Link to="create"><button className="nes-btn menu-btn">Create New</button></Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Home