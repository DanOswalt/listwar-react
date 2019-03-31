import React from 'react';

const RoundsNotifier = (numEntries) => {
  let numRounds = 0; 

  for (let i = 0; i < numEntries; i++) {
    numRounds += i
  }

  const message = `(${numEntries} entries = ${numRounds} rounds.)`
  
  return (
    <div className="RoundsNotifier">
      <div className="nes-text is-primary">
        {message}
      </div>
    </div>
  )
}

export default RoundsNotifier;