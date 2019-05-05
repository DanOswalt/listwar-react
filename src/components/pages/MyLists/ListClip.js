import React from 'react';
import { Link } from 'react-router-dom';

const ListClip = ({ list }) => {
  const { title, url, winner, resultId } = list;
  const icon = resultId && <i className="nes-icon trophy is-small"></i>;
  const item = resultId ? <div className="winner-entry">{winner}</div> : "--not yet completed--";

  return (
    <div className="list-clip-container">
      <Link to={url}>
        <div className="list-clip nes-container with-title is-dark is-rounded">
          <p className="title">{title}</p>
          {icon}{item}
        </div>
      </Link>
    </div>
  )
}

export default ListClip;