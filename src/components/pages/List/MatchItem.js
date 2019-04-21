import React from 'react';
import { Spring } from 'react-spring/renderprops';

const MatchItem = ({ winnerIndex, loserIndex, text, pickWinner, from, to, delay, animation, isHero}) => {
  const adjustedFrom = animation === "enter" ? { marginLeft: from.marginLeft * Math.random() - 1000} : from;

  return (
    <Spring
      from={adjustedFrom}
      to={to}
      delay={delay}
      reset>
      {props=> (
        <div className="matchStyle" style={props} onClick={() => {pickWinner(winnerIndex, loserIndex, isHero)}} >{text}</div>
      )}
    </Spring>
  )
}

export default MatchItem;