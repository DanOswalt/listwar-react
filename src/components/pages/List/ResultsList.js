import React from 'react';
import { Trail, config } from 'react-spring/renderprops';

const ResultsList = ({ alias, title, entries}) => (
  <div className="result-view-container">
    <h6 className="nes-text header-alias">{alias}</h6>
    <div className="nes-container is-dark is-rounded with-title results-container">
      <p className="title">{title}</p>
      <ul className="results items nes-list">
        <Trail
          items={entries}
          keys={entry => entry}
          from={{ marginBottom: 10, opacity: 0 }}
          to={{ marginBottom: 0, opacity: 1 }}
          config={{ tension: 120, friction: 14, clamp: true }}>
          {entry => props => (
            <div style={props} className="animated-entry">
              {entry}
            </div>
          )}
        </Trail>
      </ul>
    </div>
  </div>
)

export default ResultsList;