import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "War",
      //listId: props.match.params.listId,
      //listSlug: props.slug,
      currentList: props.state.currentList,
      navButtons: {
        back: {
          text: "Back",
          route: `/list/${props.state.currentList.listId}/${props.state.currentList.slug}`,
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
          text: "Complete",
          route: "#",
          disabled: true,
          action: null
        } 
      }
    }
  }

  render () {
    const { pageTitle, navButtons } = this.state;

    return (
      <div className="ListView">
        <Header 
          pageTitle={pageTitle} 
        />
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
