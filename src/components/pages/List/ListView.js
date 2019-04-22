import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';
import RoundsNotifier from './RoundsNotifier';
import { withRouter } from 'react-router-dom';

class ListView extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "Ready?",
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
    // check for existing result and/or existing list
    const { currentList, match } = this.props;
    setTimeout(() => {
      if (currentList.entries.length > 0) {
        console.log('from create page');
      } else {
        console.log('from url');
        this.props.getCurrentList(match.params.listId, match.params.slug, true);
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
