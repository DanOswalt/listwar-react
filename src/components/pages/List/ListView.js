import React, { Component} from 'react';
import Header from '../../layout/Header';
import NavButtons from '../../layout/NavButtons.js';
import RoundsNotifier from './RoundsNotifier';
import { Trail } from 'react-spring/renderprops';
import { withRouter } from 'react-router-dom';

class ListView extends Component {
  constructor(props) {
    super(props);

    const { match, user } = this.props;

    this.state = {
      pageTitle: `Ready?`,
      navButtons: {
        back: {
          text: "Home",
          route: "/",
          disabled: false,
          action: null
        },
        share: {
          text: "Invite",
          route: `${match.url}/share`,
          disabled: false,
          action: null
        },
        confirm: {
          text: "Ready!",
          route: `${match.url}/war`,
          disabled: false,
          action: null
        } 
      }
    }
  }

  componentDidMount () {
    const { match, toggleLoading } = this.props;
    toggleLoading();
    setTimeout(() => {
      this.props.getCurrentList(match.params.listId, match.params.slug, true);
    }, 0)
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { currentList, alias } = this.props;
    const entries = currentList.entries.map((entry, index) => {
      return <li className="nes-text is-dark is-rounded list-entry" key={index}>{entry}</li>
    })
    const listTitle = currentList.title;
    const numEntries = entries.length;
    const listExists = numEntries > 0;

    const list = (
        <div className="list-container nes-container is-dark is-rounded with-title lists">
          <p className="title">{listTitle}</p>
           <ul className="nes-list entries">
            <Trail
              items={entries}
              keys={entry => entry}
              from={{ marginTop: 50, opacity: 0 }}
              to={{ marginTop: 0, opacity: 1 }}
              config={{ tension: 120, friction: 14, clamp: true }}>
              {entry => props => (
                <div style={props} className="animated-entry">
                  {entry}
                </div>
              )}
            </Trail>
           </ul>
        </div>
    )

    return (
      <div className="ListView">
        <Header 
          pageTitle={pageTitle}
          alias={alias}
        />
        <div className="list-view-container">
          <div className="nes-container with-title is-rounded is-dark instructions-box">
            <p className="title">Each round:</p>
            <li className="instructions">2 list items pop up.</li>
            <li className="instructions">Pick a winner.</li>
            <li className="instructions">Don't think too hard!</li>
          </div>
        { listExists && list }
        </div>
        <footer>
          <NavButtons 
            back={navButtons.back}
            share={navButtons.share}
            confirm={navButtons.confirm}
          />
        </footer>
      </div>
    )
  }

}

export default withRouter(ListView);
