import React, { Component} from 'react';
import Header from '../layout/Header';
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

    if (newEntry === "" || newEntry.length > 12 || newEntry.match(/^\w+$/) === null) return;
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
    const entries = this.state.entries.filter(entry => {
      return entry !== deletedValue;
    });
    this.setState({entries});
  }

  handleSubmit = (e) => {
    const { createNewList } = this.props;
    const { listTitle, entries} = this.state
    e.preventDefault();
    createNewList(listTitle, entries);
  }

  entryIsDuplicate = (newEntry) => {
    const lowerCaseNewEntry = newEntry.toLowerCase();
    return this.state.entries.map(entry => entry.toLowerCase()).includes(lowerCaseNewEntry);
  }

  render () {
    const { pageTitle, newEntry, listTitle, navButtons } = this.state;
    const { alias } = this.props;
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
          alias={alias} 
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
                maxLength="12"
                onChange={this.handleInput}
                onKeyUp={this.handleKeyup}
              />
              <br/>
              <input 
                className="new-entry nes-input is-dark" 
                type="text" 
                id="list-entry"
                placeholder="Enter new list item"
                maxLength="12"
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
          {navButtons.confirm.disabled = entries.length < 4 || 
                                         entries.length > 12 || 
                                         listTitle.trim() === "" || 
                                         listTitle.trim().length > 12 ||
                                         listTitle.trim().match(/^\w+$/) === null}
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