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
    const shareUrl = window.location.href.replace("/share", ""); 

    return (
      <div className="Share">
        <Header 
          pageTitle={pageTitle}
        />
        <div className="urlBox">
          <label htmlFor="shareUrl">Copy this url...</label>
          <input 
            className="new-entry nes-input is-dark" 
            type="text" 
            id="shareUrl"
            value={shareUrl}
            onClick={this.handleClick}
            readOnly
          />
        </div>
        <div class="social-buttons">
          <p>...or do the social media thing</p> 
          <div class="share">
            <a><i class="nes-icon twitter"></i></a> 
            <a><i class="nes-icon facebook"></i></a>
            <a><i class="nes-icon google"></i></a>
            <a><i class="nes-icon linkedin"></i></a>
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