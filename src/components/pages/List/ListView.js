import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';

import firebase from '../../../firebase/firebaseInit.js';
require('firebase/auth');

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "View List",
      listId: props.match.params.listId,
      currentList: props.state.currentList,
      navButtons: {
        back: {
          text: "Back",
          route: "/",
          disabled: false,
          action: null
        },
        share: {
          text: "Share",
          route: "/",
          disabled: false,
          action: null
        },
        confirm: {
          text: "War",
          route: "#",
          disabled: false,
          action: null
        } 
      }
    }
  }

  fetchList() {
    const db = firebase.firestore();
    const listRef = db.collection('lists').doc(this.state.listId);

    listRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('no list')
          // load doesn't exist text
        } else {
          console.log('list exists')
          const currentList = doc.data();
          this.setState({currentList});
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount () {
    if (this.props.state.currentList.entries.length > 0) {
      console.log('from create page');
    } else {
      console.log('from url');
      // get list from db, if exists
      // check user to see if list was already completed
      // for now, assume user has not
      this.fetchList();
    }
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const entries = this.state.currentList.entries.map((entry, index) => {
      return <li key={index}>{entry}</li>
    })

    return (
      <div className="ListView">
        <Header 
          pageTitle={pageTitle} 
        />
        <div className="list-view-container">
          <div className="list-container nes-container is-dark is-rounded with-title lists">
            <p className="title">{this.state.currentList.title}</p>
            <ul className="entries nes-list">
              {entries}
            </ul>
          </div>
        </div>

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

export default ListView;
