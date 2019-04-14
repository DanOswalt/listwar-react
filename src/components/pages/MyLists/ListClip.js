import React from 'react';

const ListClip = ({ list }) => {
  const { title, url, winner, completed } = list;
  const icon = completed && <i className="nes-icon trophy is-small"></i>;
  const item = completed ? <div className="winner-entry">{winner}</div> : "--not yet completed--";

  return (
    <a href={url}>
      <div className="list-clip nes-container with-title is-dark is-rounded">
        <p className="title">{title}</p>
        {icon}{item}
      </div>
    </a>
  )
}

export default ListClip;