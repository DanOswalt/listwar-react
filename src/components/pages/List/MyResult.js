import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';
import { withRouter } from 'react-router-dom';

class MyResult extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "Your Final Ranks:",
      navButtons: {
        back: {
          text: "Home",
          route: "/",
          disabled: false,
          action: null
        },
        share: {
          text: "Share",
          route: `/list/${match.params.listId}/${match.params.slug}/share`,
          disabled: false,
          action: null
        },
        confirm: {
          text: "See All",
          route: `/list/${match.params.listId}/${match.params.slug}/allResults`,
          disabled: false,
          action: null
        } 
      }
    }
  }

  componentDidMount () {
    const { currentResult, match } = this.props;

    setTimeout(() => {
      if (currentResult.items.length > 0) {
        console.log('from war page');
      } else {
        console.log('from url');
        this.props.getCurrentResult(match.params.listId);
      }
    }, 1000)
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { currentResult } = this.props;
    const items = currentResult.items.map((item, index) => {
      const { rank, value, wins } = item;
      const resultItem = `${rank}. ${value} (${wins} pts)`;
      return <li className="list-entry" key={rank}>{resultItem}</li>
    })
    const listTitle = currentResult.title;
    const numItems = items.length;
    const listExists = numItems > 0;

    const list = (
      <div className="list-view-container">
        <div className="list-container nes-container is-dark is-rounded with-title lists">
          <p className="title is-primary">{listTitle}</p>
           <ul className="items nes-list">
            {items}
           </ul>
        </div>
      </div>
    )

    return (
      <div className="ListWar">
        <Header 
          pageTitle={pageTitle}
        />
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

export default withRouter(MyResult);
