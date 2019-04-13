import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';
import { withRouter } from 'react-router-dom';

class AllResults extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "All Results For " + props.currentList.title,
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
          text: "Your Result",
          route: `${match.url}/myResult`,
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
      }
    }, 1000)
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { currentResult } = this.props;
    const items = currentResult.items.map((item, index) => {
      const { rank, value, wins } = item;
      const resultItem = `${rank}. ${value} (${wins} pts)`;
      return <li key={rank}>{resultItem}</li>
    })
    const listTitle = currentResult.title;
    const numItems = items.length;
    const listExists = numItems > 0;

    const list = (
      <div className="list-view-container">
        <div className="list-container nes-container is-dark is-rounded with-title lists">
          <p className="title">{listTitle}</p>
           <ul className="items nes-list">
            {items}
           </ul>
        </div>
      </div>
    )

    return (
      <div className="AllResults">
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

export default withRouter(AllResults);
