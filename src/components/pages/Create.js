import React, { Component} from 'react';
import Header from '../layout/Header';
import Message from '../layout/Message.js';
import NavButtons from '../layout/NavButtons.js';
import ListEntry from './Create/ListEntry.js';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "Create New List",
      subText: "Enter 4+ items (max 12)",
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
    this.setState({ 
      entries: [...this.state.entries, this.state.newEntry],
      newEntry: "" 
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render () {
    const {
      pageTitle,
      subText,
      newEntry
    } = this.state;
    const entries = this.state.entries.map((entry, index) => {
      return <ListEntry value={entry} index={index}/>
    })

    return (
      <div className="Create">
        <Header 
          pageTitle={pageTitle} 
          subText={subText}
        />
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
              className="nes-btn add-entry is-success"
              onClick={this.handleAdd}
            >+</span>
          </div>
        </form>
        <div className="list-container is-dark with-title nes-container lists">
          <p className="title">List</p>
          <ul className="entries nes-list">
            {entries}
          </ul>
        </div>
        <footer>
          {/* <Message /> */}
          <NavButtons />
        </footer>
      </div>
    )
  }
}

export default Create