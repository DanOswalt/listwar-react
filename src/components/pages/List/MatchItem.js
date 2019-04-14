import React from 'react';

const MatchItem = ({ pickWinner, winnerIndex, loserIndex, text }) => {
  return <div className="list-entry match-entry" onClick={() => {pickWinner(winnerIndex, loserIndex)}} >{text}</div>
}

export default MatchItem;