import React from 'react';

const ListClip = ({ list }) => {
  const { title, listId, winner, completed } = list;
  const icon = completed && <i className="nes-icon trophy is-small"></i>;
  const item = completed ? <span className="nes-container is-rounded winner-entry">{winner}</span> : "--not yet completed--";

  return (
    <div className="list-clip nes-container with-title is-dark is-rounded">
      <p className="title">{title}</p>
      {icon}{item}
    </div>
  )
}

export default ListClip;