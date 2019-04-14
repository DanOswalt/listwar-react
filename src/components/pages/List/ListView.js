import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';
import RoundsNotifier from './RoundsNotifier';
import { withRouter } from 'react-router-dom';
import firebase from '../../../firebase/firebaseInit.js';
require('firebase/auth');

class ListView extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "View List",
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
          text: "War",
          route: `${match.url}/war`,
          disabled: false,
          action: null
        } 
      }
    }
  }

  componentDidMount () {
    // check for existing result and/or existing list
    const { currentList, match } = this.props;
    setTimeout(() => {
      if (currentList.entries.length > 0) {
        console.log('from create page');
      } else {
        console.log('from url');
        // get list from db, if exists
        // check user to see if list was already completed
        // for now, assume user has not
        console.log(match)
        this.props.getCurrentList(match.params.listId);
      }
    }, 1000)
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { currentList } = this.props;
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
           <ul className="nes-list is-disc entries">
            {entries}
           </ul>
        </div>
      </div>
    )

    return (
      <div className="ListView">
        <Header 
          pageTitle={pageTitle}
        />
        { listExists && <RoundsNotifier numEntries={numEntries} /> }
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
