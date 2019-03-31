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
      loading: true,
      message: null,
      showErrorMessage: false,
      showInfoMessage: false
    }

    this.createAppUser = this.createAppUser.bind(this);
    this.createNewList = this.createNewList.bind(this);
  }

  handleError = error => {
    console.log(error.message)
    this.setState({ 
      loading: false,
      message: error.message,
      showErrorMessage: true
    })
  }

  createNewList(title, entries) {
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

    user.lists.push(newList.listId);

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

  createAppUser({ uid }) {
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

  componentDidMount () {
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
        <Layout state={this.state}
                createNewList={this.createNewList}/>
      </div>
    );
  }
}

export default withRouter(App);
