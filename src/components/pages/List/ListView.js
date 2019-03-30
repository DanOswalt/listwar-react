import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';
import ListEntry from './../Create/ListEntry.js';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "View List",
      listTitle: "",
      entries: [],
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
          disabled: true,
          action: null
        },
        confirm: {
          text: "War",
          route: "#",
          disabled: true,
          action: this.handleSubmit
        } 
      }
    }
  }
  render () {
    const { pageTitle, navButtons } = this.state;
    const entries = this.state.entries.map((entry, index) => {
      return <li key={index}>{entry}</li>
    })

    return (
      <div className="ListView">
        <Header 
          pageTitle={pageTitle} 
        />
        <div className="new-list-container">
          <div className="list-container nes-container is-dark is-rounded with-title lists">
            <p className="title">{this.listTitle}</p>
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