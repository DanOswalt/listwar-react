import React from 'react';

const MatchItem = ({ pickWinner, winnerIndex, loserIndex, text }) => {
  return <div className="nes-btn is-primary" onClick={() => {pickWinner(winnerIndex, loserIndex)}} >{text}</div>
}

export default MatchItem;