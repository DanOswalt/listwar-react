import React, { Component} from 'react';
import Header from '../layout/Header';
import Message from '../layout/Message.js';
import NavButtons from '../layout/NavButtons.js';
import ListClip from './MyLists/ListClip.js';
import { withRouter } from 'react-router-dom';

class MyLists extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "Select to view",
      navButtons: {
        back: {
          text: "Home",
          route: "/",
          disabled: false,
          action: null
        },
        share: {
          text: "Share",
          route: "#",
          disabled: true,
          action: null
        },
        confirm: {
          text: "Ready!",
          route: "#",
          disabled: true,
          action: null
        } 
      }
    }
  }

  componentDidMount () {
    this.props.resetCurrents();
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { user, alias } = this.props;
    const userLists = user.lists.sort((a, b) => b.timestamp - a.timestamp)
                                .map((list, index) => <ListClip key={index} list={list} />);

    const list = (
      <div className="list-container">  
        {userLists}
      </div>
    )

    return (
      <div className="MyLists">
        <Header 
          pageTitle={pageTitle}
          alias={alias}
        />
        {list}
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

export default withRouter(MyLists);
