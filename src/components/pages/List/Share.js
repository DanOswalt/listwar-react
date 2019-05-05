import React, { Component} from 'react';
import Header from '../../layout/Header';
import NavButtons from '../../layout/NavButtons.js';
import { withRouter } from 'react-router-dom';

class Share extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "Share this list with a friend and compare!",
      navButtons: {
        back: {
          text: "Back",
          route: `/list/${match.params.listId}/${match.params.slug}`,
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
          text: "Done",
          route: "#",
          disabled: true,
          action: null
        } 
      }
    }
  }

  handleClick = e => {
    e.target.select();
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { user } = this.props;
    const sharedByQueryString = "?sharedby=" + user.alias;
    const shareUrl = window.location.href.replace("/share", sharedByQueryString);

    return (
      <div className="Share">
        <Header 
          pageTitle={pageTitle}
          alias={user.alias}
        />
        <br/>
        <p className="nes-text instructions">Same device:</p>
        <p className="nes-text instructions">Change the "Playing as" alias above.</p>
        <br/>
        <p className="nes-text instructions">Different device:</p>
        <p className="nes-text instructions">Copy this url or click a social link:</p>
        <br/>
        <div className="urlBox">
          <textarea 
            className="new-entry nes-input is-dark" 
            type="text" 
            id="shareUrl"
            value={shareUrl}
            onClick={this.handleClick}
            readOnly
          />
        </div>
        <div className="social-buttons">
          <div className="share">
            <a><i className="nes-icon twitter"></i></a> 
            <a><i className="nes-icon facebook"></i></a>
            <a><i className="nes-icon google"></i></a>
            <a><i className="nes-icon linkedin"></i></a>
          </div>
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

export default withRouter(Share);