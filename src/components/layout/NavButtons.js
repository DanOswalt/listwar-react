import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = ({ btn, color }) => {
  return <div className={`nes-btn nav-btn ${(btn.disabled ? "is-disabled fade" : color)}`}>{btn.text}</div>
}

const NavButtons = ({ back, share, confirm }) => {
  const backButton = <NavButton btn={back} color={"is-error"} />
  const shareButton = <NavButton btn={share} color={"is-primary"} />
  const confirmButton = <NavButton btn={confirm} color={"is-success"} />

  return (
  <div className="NavButtons">
    <div className="nes-container is-dark is-rounded navlinks">
      {back.disabled ? backButton : <Link onClick={back.action} to={back.route}>{backButton}</Link>}
      {share.disabled ? shareButton : <Link onClick={share.action} to={share.route}>{shareButton}</Link>}
      {confirm.disabled ? confirmButton : <Link onClick={confirm.action} to={confirm.route}>{confirmButton}</Link>}
    </div>
  </div>
  )
}

export default NavButtons