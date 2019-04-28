import React from 'react';
import { Link } from 'react-router-dom';

const ListClip = ({ list, userAlias }) => {
  const { title, url, winner, resultId, alias } = list;
  const icon = resultId && <i className="nes-icon trophy is-small"></i>;
  const item = resultId ? <div className="winner-entry">{winner}</div> : "--not yet completed--";
  // const listHasDifferentAlias = userAlias !== alias;
  // const clickToPlayMsg = <span className="nes-text play-msg"> (Click to play as {userAlias})</span>;
  console.log(list)

  return (
    <div className="list-clip-container">
      <Link to={url}>
        <div className="little-alias-box">
          <i className="nes-icon is-small star"></i>
            <span className="nes-text little-alias">{alias}</span>
          <i className="nes-icon is-small star"></i>
        </div>
        <div className="list-clip nes-container with-title is-dark is-rounded">
          <p className="title">{title}</p>
          {icon}{item}
          {/* {listHasDifferentAlias && clickToPlayMsg} */}
        </div>
      </Link>
    </div>
  )
}

export default ListClip;