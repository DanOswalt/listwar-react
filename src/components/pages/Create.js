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
      listTitle: "New List",
      newEntry: "",
      entries: [],
      navButtons: {
        back: {
          text: "Back",
          route: "/",
          disabled: false
        },
        share: {
          text: "Share",
          route: "/",
          disabled: true
        },
        confirm: {
          text: "Done",
          route: "/",
          disabled: true
        } 
      }
    }
  }

  handleInput = (e) => {
    const value = e.target.value;
    const key = e.target.id === "list-entry" ? "newEntry" : "listTitle";

    this.setState({ [key]: value })
  }

  handleKeyup = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      console.log(e.target.id)
      this.handleAdd(e);
    }
  }

  handleAdd = (e) => {
    const newEntry = this.state.newEntry.trim();

    if (newEntry === "") return;
    if (this.entryIsDuplicate(newEntry)) {
      console.log('message for that entry is already added')
    } else {
      this.setState({ 
        entries: [...this.state.entries, newEntry],
        newEntry: ""
      });
    }
  }

  handleDelete = (deletedValue) => {
    console.log(deletedValue)
    const entries = this.state.entries.filter(entry => {
      return entry !== deletedValue;
    });
    this.setState({entries});
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  entryIsDuplicate = (newEntry) => {
    const lowerCaseNewEntry = newEntry.toLowerCase();
    return this.state.entries.map(entry => entry.toLowerCase()).includes(lowerCaseNewEntry);
  }

  render () {
    const { pageTitle, newEntry, listTitle, navButtons } = this.state;
    const entries = this.state.entries.map((entry, index) => {
      return <ListEntry 
               value={entry} 
               index={index}
               handleDelete={this.handleDelete}
             />
    })

    return (
      <div className="Create">
        <Header 
          pageTitle={pageTitle} 
        />
        <div className="new-list-container">
          <form 
            className="new-list-form"
            onSubmit={this.handleSubmit}
          >
            <div className="nes-field">
              <input
                className="new-title nes-input is-dark" 
                type="text" 
                id="list-title"
                placeholder="Give it a title"
                onChange={this.handleInput}
                onKeyUp={this.handleKeyup}
              />
              <input 
                className="new-entry nes-input is-dark" 
                type="text" 
                id="list-entry"
                placeholder="Enter new list item"
                value={newEntry}
                onChange={this.handleInput}
                onKeyUp={this.handleKeyup}
              />
              <span 
                className="add-entry nes-btn is-success"
                onClick={this.handleAdd}
              >+</span>
            </div>
          </form>
          <div className="list-container nes-container is-dark is-rounded with-title lists">
            <p className="title">{listTitle}</p>
            <ul className="entries nes-list">
              {entries}
            </ul>
          </div>
        </div>

        <footer>
          {/* <Message /> */}
          {navButtons.confirm.disabled = entries.length < 4}
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

export default Create