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
        lists: [],
        uid: null,
        alias: "anon"
      },
      currentList: {
        listId: "",
        title: "",
        entries: [],
        listSlug: "",
        url: ""
      },
      currentResult: {
        id: "",
        title: "",
        items: [],
        url: ""
      },
      allResults: [],
      loading: true,
      message: null,
      showErrorMessage: false,
      showInfoMessage: false
    }
  }

  getAllResultsByListId = (listId) => {
    const db = firebase.firestore();
    const allResultsRef = db.collection('results').where('listId', '==', listId).orderBy('timestamp', 'desc');
    const allResults = [];

    allResultsRef.get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log(doc.data())
          allResults.push(doc.data());
        })
      })
      .then(() => {
        this.setState({
          loading: false,
          allResults
        })
      })
      .catch(this.handleError)
  }

  getCurrentList = (listId, slug, redirectIfCompleted) => {
    const self = this;
    const { user } = self.state;

    let counter = 0;
    if (!user.uid) {
      setTimeout(() => {
        counter++;
        if(counter === 100) {
          this.props.history.push("/");
        }
        this.getCurrentList(listId, slug, redirectIfCompleted);
      }, 0);
    }

    // is list is completed, redirect to myResult
    if (user.uid) {
      const listsForAlias = user.lists.filter(list => list.alias === user.alias);
      const listIndex = listsForAlias.findIndex(list => list.listId === listId);
      const list = listsForAlias[listIndex];
  
      if (redirectIfCompleted && list && list.resultId && user.alias === list.alias) {
        self.props.history.push(`/list/${listId}/${slug}/myResult`)
      }
  
      const db = firebase.firestore();
      const listRef = db.collection('lists').doc(listId);
  
      listRef.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('no list')
            self.setState({ loading: false });
          } else {
            console.log('list exists')
            const currentList = doc.data();
            // okay, check if user.lists is there for this alias
            if (listIndex === -1) {
              console.log('...but not cached for this alias')
              user.lists.push({
                alias: user.alias, 
                listId,
                resultId: null,
                winner: null,
                url: `list/${listId}/${currentList.listSlug}`,
                title: currentList.title  
              });
            }
            self.setState({ loading: false, currentList});
          }
        })
        .catch(this.handleError);
    }
  }

  saveResult = (result, currentListId, slug) => {
    const db = firebase.firestore();
    const resultRef = db.collection('results').doc(result.id);
    const winner = result.items[0].value;
    result.timestamp = new Date().getTime();

    resultRef.set(result)
      .then(() => {
        console.log('result added', result);
        this.markAsComplete(currentListId, slug, winner, result);
        this.setState({ loading:false, currentResult: result });
      })
      .catch(this.handleError);
  }

  markAsComplete = (currentListId, slug, winner, result) => {
    const db = firebase.firestore();
    const user = {...this.state.user};
    // filter lists by alias... then the list should be unique
    const listsForAlias = user.lists.filter(list => list.alias === user.alias);
    const listIndex = listsForAlias.findIndex(list => list.listId === currentListId);
    const list = listsForAlias[listIndex];

    list.resultId = result.id; 
    list.timestamp = new Date().getTime();
    list.winner = winner;

    const userRef = db.collection('users').doc(user.uid);
    userRef.update({lists: user.lists})
      .then(() => {
        this.setState({ loading: false, user });
      })
      .then(() => this.props.history.push(`/list/${currentListId}/${slug}`))
      .catch(this.handleError);
  }

  getCurrentResult = (listId, slug) => {
    const { user } = this.state;
    const resultId = listId + user.uid + user.alias;

    const self = this;
    const db = firebase.firestore();
    const resultRef = db.collection('results').doc(resultId);

    resultRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('no result')
          this.props.history.push(`/list/${listId}/${slug}`);
          
          // load doesn't exist text
        } else {
          console.log('result exists')
          const currentResult = doc.data();
          console.log('fresh from db:', currentResult)
          self.setState({
            loading: false,
            currentResult
          });
        }
      })
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

    user.lists.push({
      alias: user.alias, 
      listId: newList.listId,
      resultId: null,
      winner: null,
      url: `list/${listId}/${listSlug}`,
      title  
    });

    const listRef = db.collection('lists').doc(newList.listId);
    const userRef = db.collection('users').doc(user.uid);

    listRef.set(newList)
      .then(() => {
        userRef.set(user)
        this.setState({
          loading: false,
          currentList: newList
          // loading: true
        })
      })
      .then(() => this.props.history.push(`/list/${newList.listId}/${newList.listSlug}`))
      .catch(this.handleError)
  }

  createAppUser = ({ uid }) => {
    const db = firebase.firestore();
    const newUser = { 
      uid,
      lists: [],
      alias: "anon" + uid.slice(0, 6),
      firstTimeUser: true
    }
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

  changeAlias = alias => {
    const db = firebase.firestore();
    const user = {...this.state.user};
    user.alias = alias;

    const userRef = db.collection('users').doc(user.uid);
    userRef.set(user)
      .then(() => {
        console.log('Alias changed:', user.alias);
        this.setState({
          loading: false,
          message: "Alias updated",
          showInfoMessage: true,
          user
        });
      })
      .then(() => this.props.history.goBack())
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

  resetCurrents = () => {
    const currentList = {
      listId: "",
      title: "",
      entries: [],
      listSlug: "",
      url: ""
    }

    const currentResult = {
      id: "",
      title: "",
      items: [],
      url: "",
      listId: ""
    }

    this.setState({ currentList, currentResult });
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading})
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
          getCurrentResult={this.getCurrentResult}
          getAllResultsByListId={this.getAllResultsByListId}
          saveResult={this.saveResult}
          resetCurrents={this.resetCurrents}
          changeAlias={this.changeAlias}
          toggleLoading={this.toggleLoading}
        />
      </div>
    );
  }
}

export default withRouter(App);
