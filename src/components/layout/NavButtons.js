import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = ({ back, share, confirm }) => {
  const backButton = <div className={`nes-btn nav-btn ${(back.disabled ? "is-disabled fade" : "is-error")}`}>{back.text}</div>
  const shareButton = <div className={`nes-btn nav-btn ${(share.disabled ? "is-disabled fade" : "is-primary")}`}>{share.text}</div>
  const confirmButton = <div className={`nes-btn nav-btn ${(confirm.disabled ? "is-disabled fade" : "is-success")}`}>{confirm.text}</div>  
  
  return (
  <div className="NavButtons">
    <div className="nes-container is-dark is-rounded navlinks">
      {back.disabled ? backButton : <Link to={back.route}>{backButton}</Link>}
      {share.disabled ? shareButton : <Link to={share.route}>{shareButton}</Link>}
      {confirm.disabled ? confirmButton : <Link to={confirm.route}>{confirmButton}</Link>}
    </div>
  </div>
  )
}

export default MainNav