import React from 'react';
import { Link } from 'react-router-dom';

const ListClip = ({ list }) => {
  const { title, url, winner, completed, alias } = list;
  const icon = completed && <i className="nes-icon trophy is-small"></i>;
  const item = completed ? <div className="winner-entry">{winner}</div> : "--not yet completed--";
  console.log(list)

  return (
    <div className="list-clip-container">
      <Link to={url}>
        <div className="little-alias-box">
          <i class="nes-icon is-small star"></i>
            <h6 className="nes-text little-alias">{alias}</h6>
          <i class="nes-icon is-small star"></i>
        </div>
        <div className="list-clip nes-container with-title is-dark is-rounded">
          <p className="title">{title}</p>
          {icon}{item}
        </div>
      </Link>
    </div>
  )
}

export default ListClip;