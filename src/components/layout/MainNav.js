import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = () => (
  <div className="mainnav">
    <Link to={"/"}>Back</Link>
    <Link to={"/"}>Share</Link>
    <Link to={"/"}>Confirm</Link>
  </div>
)

export default MainNav