import React, { Component } from 'react';
import Layout from './components/layout/Layout.js';
import { withRouter } from 'react-router-dom';
import slugify from 'slugify'
import shortid from 'shortid'
import 'nes.css/css/nes.css'
import './App.css';

import firebase from './firebase/firebaseInit.js';
require('firebase/auth');

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        lists: []
      },
      currentList: {
        listId: "",
        title: "",
        entries: [],
        listSlug: ""
      },
      currentResult: {
        id: "",
        items: []
      },
      loading: true,
      message: null,
      showErrorMessage: false,
      showInfoMessage: false
    }
  }

  getCurrentList = listId => {
    console.log("listid:", listId)
    const self = this;
    const db = firebase.firestore();
    const listRef = db.collection('lists').doc(listId);

    listRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('no list')
          // load doesn't exist text
        } else {
          console.log('list exists')
          const currentList = doc.data();
          console.log('fresh from db:', currentList)
          self.setState({currentList});
        }
      })
      .catch(this.handleError);
  }

  saveResult = (result, currentListId) => {
    const db = firebase.firestore();
    const resultRef = db.collection('results').doc(result.id);
    resultRef.set(result)
      .then(() => {
        console.log('result added', currentListId);
        this.markAsComplete(currentListId);
        this.setState({ currentResult: result });
      })
      .catch(this.handleError);
  }

  markAsComplete = currentListId => {
    const db = firebase.firestore();
    const user = {...this.state.user};
    const listIndex = user.lists.findIndex(list => list.listId === currentListId);
    user.lists[listIndex].completed = true;
    const userRef = db.collection('users').doc(user.uid);
    userRef.update({lists: user.lists})
      .then(() => {
        this.setState({ user });
      })
      .then(() => this.props.history.push(`/list/${currentListId}/${this.state.currentList.listSlug}/myResult`))
      .catch(this.handleError);
  }

  createNewList = (title, entries) => {
    const { user } = this.state;
    const db = firebase.firestore();
    const listSlug = slugify(title, {
      replacement: '-',
      remove: /[$*_+~.()'"!\-:@]/g,
      lower: true
    })
    const listId = shortid.generate();
    const newList = {
      listId,
      title,
      entries,
      listSlug
    }

    user.lists.push({ listId: newList.listId, completed: false});

    const listRef = db.collection('lists').doc(newList.listId);
    const userRef = db.collection('users').doc(user.uid);

    listRef.set(newList)
      .then(() => {
        userRef.set(user)
        this.setState({
          currentList: newList
          // loading: true
        })
      })
      .then(() => this.props.history.push(`/list/${newList.listId}/${newList.listSlug}`))
      .catch(this.handleError)
  }

  createAppUser = ({ uid }) => {
    const db = firebase.firestore();
    const lists = [];
    const newUser = { uid, lists }

    const userRef = db.collection('users').doc(uid);
    userRef.set(newUser)
    .then(user => {
      console.log('App user created:', newUser);
      this.setState({
        loading: false,
        message: "App user created",
        showInfoMessage: true,
        user: newUser
      });
    })
    .catch(this.handleError)
  }

  handleError = error => {
    console.log(error.message)
    this.setState({ 
      loading: false,
      message: error.message,
      showErrorMessage: true
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        let user = null;
        const db = firebase.firestore();
        const uid = authenticatedUser.uid;
        const userRef = db.collection('users').doc(uid);

        // don't save uid in state
        console.log(`logged in: ${ uid }`);
    
        // get the app user
        userRef.get()
          .then(doc => {
            if (doc.exists) {
              user = doc.data();
              this.setState({ 
                user,
                loading: false,
                message: `${user.uid} logged in`,
                showErrorMessage: false,
                showInfoMessage: true
              });
            } else {
              // if user doesn't exist, create it
              console.log(`data is not found, will create new user`);
              this.createAppUser({
                loading: false,
                uid
              });
            }
          })
          .catch(this.handleError)
      } else {
        firebase.auth().signInAnonymously()
          .then(authenticatedUser => {
            console.log('user anonymously logged in')
            this.createAppUser({
              uid: authenticatedUser.user.uid
            }) 
          })
          .catch(this.handleError)
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Layout 
          appState={this.state}
          createNewList={this.createNewList}
          getCurrentList={this.getCurrentList}
          saveResult={this.saveResult}
        />
      </div>
    );
  }
}

export default withRouter(App);
