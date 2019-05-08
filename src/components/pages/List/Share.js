import React, { Component} from 'react';
import Header from '../../layout/Header';
// import ChangeName from '../ChangeName.js';
import NavButtons from '../../layout/NavButtons.js';
import { Link, withRouter } from 'react-router-dom';

class Share extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "Have a friend war this list and compare!",
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

  // handleClick = e => {
  //   e.target.select();
  // }

  copyToClipboard = (e) => {
    e.target.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };

  render () {
    const { pageTitle, navButtons } = this.state;
    const { user, match } = this.props;
    const sharedByQueryString = "?sharedby=" + user.alias;
    const shareUrl = window.location.href.replace("/share", sharedByQueryString);

    return (
      <div className="Share">
        <Header 
          pageTitle={pageTitle}
          alias={user.alias}
        />
        <br/>
        <h6 className="nes-text instructions-label">Same device:</h6>
        {/* <p className="nes-text instructions">Change the "playing as" alias above.</p> */}
        <Link to={`/changeName`}>
          <div className="nes-btn">Change Alias</div>
        </Link>
        <br/>
        <br/>
        <br/>
        <h6 className="nes-text instructions-label">Different device:</h6>
        <p className="nes-text instructions">Copy this url:</p>
        <div className="urlBox">
          <textarea 
            className="new-entry nes-input is-dark" 
            type="text" 
            id="shareUrl"
            value={shareUrl}
            onClick={this.copyToClipboard}
            readOnly
          />
        </div>
        {/* <div className="social-buttons">
          <div className="share">
            <a><i className="nes-icon twitter"></i></a> 
            <a><i className="nes-icon facebook"></i></a>
            <a><i className="nes-icon google"></i></a>
            <a><i className="nes-icon linkedin"></i></a>
          </div>
        </div> */}
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