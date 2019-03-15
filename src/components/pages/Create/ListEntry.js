import React from 'react';

const ListEntry = ({ value, index }) => {
  return (
  <li className="ListEntry" key={index}>
    <span className="nex-text entry-value">{ value }</span>
    <span className="nes-btn delete-entry is-error">X</span>
  </li>)
}

export default ListEntry