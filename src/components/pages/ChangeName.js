import React, { Component} from 'react';
import Header from '../layout/Header';
import Message from '../layout/Message.js';
import NavButtons from '../layout/NavButtons.js';
import { withRouter } from 'react-router-dom';

class ChangeName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "Change Alias?",
      userInput: "",
      navButtons: {
        back: {
          text: "Back",
          route: "#",
          disabled: false,
          action: () => this.props.history.goBack()
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
          action: this.handleSubmit
        } 
      }
    }
  }

  handleInput = (e) => {
    const userInput = e.target.value;
    if (userInput.length <= 10) {
      this.setState({ userInput })
    }
  }

  handleSubmit = (e) => {
    const { changeAlias } = this.props;
    const { userInput } = this.state;
    e.preventDefault();

    changeAlias(userInput);
  }

  render () {
    const { pageTitle, userInput, navButtons } = this.state;
    const { alias } = this.props;

    return (
      <div className="ChangeName">
        <Header 
          pageTitle={pageTitle} 
          alias={alias}
        />
        <div className="list-container">
          <form 
            className="change-name-form"
            onSubmit={this.handleSubmit}
          >
          <p>(Change alias to war a list as another person on same device)</p>
          <p>10 chars or less, no special chars.</p>
            <div className="nes-field">
              <input
                className="new-title nes-input is-dark" 
                type="text" 
                id="change-name"
                placeholder={userInput}
                onChange={this.handleInput}
                maxLength="12"
              />
            </div>
          </form>
          <div className="alias-box">
            <i class="nes-icon is-small star"></i>
            <span className="nes-text alias">{userInput ? userInput : alias }</span>
            <i class="nes-icon is-small star"></i>
          </div>
        </div>

        <footer>
          {/* <Message /> */}
          {navButtons.confirm.disabled = userInput.trim() === "" || 
                                         userInput.trim().length > 12 ||
                                         userInput.trim().match(/^\w+$/) === null}
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

export default withRouter(ChangeName);