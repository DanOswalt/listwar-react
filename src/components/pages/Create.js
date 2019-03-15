import React, { Component} from 'react';
import Header from '../layout/Header';
import Message from '../layout/Message.js';
import NavButtons from '../layout/NavButtons.js';


class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listTitle: "",
      newEntry: "",
      entries: []
    }
  }

  handleInput = (e) => {
    const newEntry = e.target.value;
    this.setState({ newEntry })
  }

  handleKeyup = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.handleAdd(e);
    }
  }

  handleAdd = (e) => {
    //check for unique-entry
    console.log(e.target)
    this.setState({ 
      entries: [...this.state.entries, this.state.newEntry],
      newEntry: "" 
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render () {
    const { newEntry } = this.state;
    return (
      <div className="Create">
        <Header pageTitle={"Create New List"} />
        <p>Enter at least 3 items to war (max 20)</p>
        <form 
          className="new-list-form"
          onSubmit={this.handleSubmit}
        >
          <div className="nes-field">
            <label htmlFor="list-entry">New Entry</label>
            <input 
              className="nes-input new-entry" 
              type="text" 
              id="list-entry"
              placeholder="tap enter to add"
              value={newEntry}
              onChange={this.handleInput}
              onKeyUp={this.handleKeyup}
            />
            <span 
              className="nes-btn add-entry"
              onClick={this.handleAdd}
            >+</span>
          </div>
        </form>
        <div className="list-container nes-container">
          <ul className="entries">
            {/* for each entry */}
          </ul>
        </div>
        <footer>
          <Message />
          <NavButtons />
        </footer>
      </div>
    )
  }
}

export default Create