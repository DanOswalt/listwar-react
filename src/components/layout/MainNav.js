import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = () => (
  <div className="MainNav">
    <div className="navlinks">
      <Link className="nes-text is-warning" to={"/"}>Back</Link>
      <Link className="nes-text is-warning" to={"/"}>Share</Link>
      <Link className="nes-text is-warning" to={"/"}>Confirm</Link>
    </div>
  </div>
)

export default MainNav