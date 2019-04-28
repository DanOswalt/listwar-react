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
          text: "Share",
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
      <div className="list-view-container"> 
        <div className="list-container nes-container is-dark is-rounded with-title lists">
          <p className="title">{listTitle}</p>
           <ul className="nes-list entries">
            <Trail
              items={entries}
              keys={entry => entry}
              from={{ marginTop: 50, opacity: 0 }}
              to={{ marginTop: 0, opacity: 1 }}>
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

    return (
      <div className="ListView">
        <Header 
          pageTitle={pageTitle}
          alias={alias}
        />
        <div className="instructions">
          <div>Two items will pop up each round.</div>
          <div>Pick a winner. Don't think too hard!</div>
          <br />
          { listExists && <RoundsNotifier numEntries={numEntries} /> }
        </div>
        { listExists && list }
        <footer>
          {/* <Message /> */}
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
