import React, { Component} from 'react';
import Header from '../layout/Header';
import Message from '../layout/Message.js';
import NavButtons from '../layout/NavButtons.js';

class ChangeName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "Change Alias?",
      userInput: "",
      navButtons: {
        back: {
          text: "Nevermind",
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
    this.setState({ userInput })
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
        />
        <div className="list-container">
          <form 
            className="change-name-form"
            onSubmit={this.handleSubmit}
          >
          <p>(This name will always be associated with this device)</p>
            <div className="nes-field">
              <input
                className="new-title nes-input is-dark" 
                type="text" 
                id="change-name"
                placeholder={userInput}
                onChange={this.handleInput}
              />
            </div>
          </form>
          <div className="alias-box">
            <i class="nes-icon is-medium star"></i>
            <span className="nes-text alias">{userInput ? userInput : alias }</span>
            <i class="nes-icon is-medium star"></i>
          </div>
        </div>

        <footer>
          {/* <Message /> */}
          {navButtons.confirm.disabled = userInput.trim() === ""}
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

export default ChangeName