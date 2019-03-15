import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = () => (
  <div className="NavButtons">
    <div className="nes-container is-dark is-rounded navlinks">
      <Link className="nes-btn nav-btn is-error" to={"/"}>Back</Link>
      <Link className="nes-btn nav-btn is-primary" to={"/"}>Share</Link>
      <Link className="nes-btn nav-btn is-success" to={"/"}>Confirm</Link>
    </div>
  </div>
)

export default MainNav