/*
  On app load, check for previous user, either anon or signed in user
  User should have an array of completed resultIds.
  App should load this into layout, so the nav layout parts can be easier
    to update (not on every view).
  Each page (inluding auth pages) will just need to show content.
  * Add page title to layout
*/

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
        username: "Guest"
      },
      guest: true,
      loading: true,
      message: null,
      showErrorMessage: false,
      showInfoMessage: false
    }
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.signUpWithEmail = this.signUpWithEmail.bind(this);
    this.signOut = this.signOut.bind(this);
    this.createAppUser = this.createAppUser.bind(this);
  }

  /*
    Auth functions
  */

  createAppUser( {uid, username, isGuest} ) {
    const db = firebase.firestore();
    const newUser = {
      username,
      isGuest,
      results: []
    }
    const userRef = db.collection('users').doc(uid);
    
    userRef.set(newUser)
    .then(userRef => {
      console.log('App user created:', userRef);
      this.setState({
        loading: false,
        guest: isGuest,
        message: "App user created",
        showInfoMessage: true,
        username
      })
      // this.props.history.push("/");
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

  signInWithEmail(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(userDoc => {
      console.log('User signed in:', userDoc);
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

  signUpWithEmail(e) {
    e.preventDefault();
    const { email, password, username } = e.target.elements;

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(userDoc => {
      const { user } = userDoc;
      console.log('User signed up:', user);

      const credential = firebase.auth.EmailAuthProvider.credential(email.value, password.value);
      firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential)
      .then(function(usercred) {
        const user = usercred.user;

        console.log("Anonymous account successfully upgraded", user);
        this.createAppUser({
          uid: user.uid, 
          username: username.value,
          isGuest: false
        });
      }, (error) => {
        console.log("Error upgrading anonymous account", error);
      });

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

  signOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null,
          guest: null
        });
        this.props.history.push("/");
      });
  }

  /* 
    When component is added to DOM
    Check if a user is logged in.
    If no, log in as anonymous
  */

  componentDidMount () {
    firebase.auth().onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        let user = null;
        const db = firebase.firestore();
        const isGuest = authenticatedUser.isAnonymous;
        const uid = authenticatedUser.uid;
        const userRef = db.collection('users').doc(uid);

        // don't save uid in state
        console.log(uid)
    
        // get the app user
        userRef.get()
          .then(doc => {
            if (doc.exists) {
              user = doc.data();
              this.setState({ 
                user,
                guest: isGuest,
                loading: false,
                message: `${isGuest ? 'Guest' : user.username} logged in`,
                showErrorMessage: false,
                showInfoMessage: true
              });
            } else {
             // if user doesn't exist, create it
             
             console.log("user doesn't exist in app db")
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
        // do dome kind of check here, what if they are trying to change users?
        firebase.auth().signInAnonymously()
        .then(authenticatedUser => {
          // check uid, if new, create it
          this.createAppUser({
            uid: authenticatedUser.user.uid,
            username: "Guest",
            isGuest: true
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
        <BrowserRouter>
          <Layout 
            signInWithEmail={this.signInWithEmail} 
            signUpWithEmail={this.signUpWithEmail} 
            signOut={this.signOut} 
            state={this.state}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
