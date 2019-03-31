import React from 'react';

const ListEntry = ({ value, index, handleDelete }) => {
  return (
    <li className="ListEntry" key={index}>
      <span className="nex-text entry-value">{ value }</span>
      <span className="nes-btn delete-entry is-error" onClick={ ()=>{handleDelete(value)} }>X</span>
    </li>
  )
}

export default ListEntry