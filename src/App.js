import React, { Component } from 'react';
import Layout from './components/layout/Layout.js';
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
      loading: true,
      message: null,
      showErrorMessage: false,
      showInfoMessage: false
    }

    this.createAppUser = this.createAppUser.bind(this);
    this.createNewList = this.createNewList.bind(this);
  }

  createNewList({ user, title, entries }) {
    const db = firebase.firestore();
    const listId = 2;
    const newList = {
      listId,
      title,
      entries 
    }
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
      })
      this.props.history.push("/");
    })
    .catch(error => {
      console.log(error.message)
      this.setState({ 
        loading: false,
        message: error.message,
        showErrorMessage: true
      });
    })
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
              console.log(`data found for user`);
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
                uid: user.uid
              });
            }
          })
          .catch(error => {
            this.setState({ 
              loading: false,
              message: error.message,
              showErrorMessage: true
            });
          })
      } else {
        firebase.auth().signInAnonymously()
        .then(authenticatedUser => {
          console.log('user anonymously logged in')
          // check uid, if new, create it
          this.createAppUser({
            uid: authenticatedUser.user.uid
          }) 
        })
        .catch(error => {
          this.setState({ 
            loading: false,
            message: error.message,
            showErrorMessage: true
          });
        })
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Layout state={this.state}/>
      </div>
    );
  }
}

export default App;
