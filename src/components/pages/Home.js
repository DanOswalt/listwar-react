import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ guest }) => {
  return (
    <div className="Home">
      <div className="home-title nes-container is-centered is-dark">
        <h1>Super ListWar</h1>
      </div>
      <div className="home-menu-box">
        <ul className="home-menu">
          <li><Link to="examples"><button className="nes-btn menu-btn">Do A List</button></Link></li>
          <li><Link to="create"><button className="nes-btn menu-btn">Create New</button></Link></li>
          {guest && <li><Link to="signin"><button className="nes-btn menu-btn">Sign In</button></Link></li>}
          {guest && <li><Link to="signup"><button className="nes-btn menu-btn">Sign Up</button></Link></li>}
          {!guest && <li><Link to="#"><button className="nes-btn menu-btn">Completed</button></Link></li>}
          {!guest && <li><Link to="signout"><button className="nes-btn menu-btn">Sign Out</button></Link></li>}
        </ul>
      </div>
    </div>
  )
}

export default Home