import React from 'react';

const RoundsNotifier = ({numEntries}) => {
  console.log(numEntries)
  let numRounds = 0; 
  for (let i = 0; i < numEntries; i++) {
    numRounds += i
  }
  const message = `(${numEntries} entries = ${numRounds} rounds. Ready?)`
  
  return (
    <div className="RoundsNotifier">
      <div className="nes-text is-success">
        {message}
      </div>
    </div>
  )
}

export default RoundsNotifier;