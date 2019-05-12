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
      pageTitle: "Invite a friend to play and compare!",
      copied: false,
      navButtons: {
        back: {
          text: "Back",
          route: `/list/${match.params.listId}/${match.params.slug}`,
          disabled: false,
          action: null
        },
        share: {
          text: "Invite",
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
    this.setState({ copied: true });
  };

  render () {
    const { pageTitle, navButtons, copied } = this.state;
    const { user, match } = this.props;
    const shareUrl = window.location.href.replace("/share", "/sharedby/" + user.alias);

    return (
      <div className="Share">
        <Header 
          pageTitle={pageTitle}
          alias={user.alias}
        />
        <br/>
        <h6 className="nes-text instructions-label">Passing to friend on same device?</h6>
        <p className="nes-text instructions">Just change name.</p>
        <Link to={`/changeName`}>
          <div className="nes-btn">Change Name</div>
        </Link>
        <br/>
        <br/>
        <br/>
        <h6 className="nes-text instructions-label">Or send invite url to different device...</h6>
        { copied ? 
          <p className="nes-text instructions copied">Copied! Ready to paste into a message.</p> : 
          <p className="nes-text instructions">Just click/tap this field to copy:</p>
        }
        <div className="urlBox">
          <textarea 
            className={`new-entry nes-input is-dark ${(copied && "clicked")}`}
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