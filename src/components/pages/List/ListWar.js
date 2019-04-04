import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';
import MatchItem from './MatchItem.js';
import { withRouter } from 'react-router-dom';
import chance from 'chance';
import firebase from '../../../firebase/firebaseInit.js';

class ListWar extends Component {
  constructor(props) {
    super(props);

    const mockList = {
      title: "Mock List",
      entries: [
        "Pizza",
        "Bananas",
        "Fish",
        "Lasagna",
        "Grapes",
        "Orange",
        "Cheese"
      ]
    }

    this.state = {
      Chance: new chance(),
      pageTitle: "War!",
      currentList: this.props.state.currentList,
      // currentList: mockList,
      currentResult: null,
      schedule: [],
      currentMatch: {
        hero: { value: "", listIndex: -1 },
        villain: { value: "", listIndex: -1 }
      },
      matchIndex: -1,
      navButtons: {
        back: {
          text: "Back",
          route: "/",
          disabled: true,
          action: null
        },
        share: {
          text: "Share",
          route: "/",
          disabled: true,
          action: null
        },
        confirm: {
          text: "Complete",
          route: "#",
          disabled: true,
          action: null
        } 
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.state.currentList) {
        this.createInitialEmptyResult();
        this.createSchedule();
        this.nextMatch();
      }
    }, 1000);
  }

  createInitialEmptyResult = () => {
    const { currentList } = this.state;
    const { user } = this.props.state;

    const currentResult = {
      id: currentList.listId + user.uid,  
      items: currentList.entries.map((value, index) => {
        return {
          value: value,
          points: 0,
          id: index,
          beats: [],
          rank: null
        }
      })
    }

    this.setState({ currentResult });
  }

  createSchedule = () => {
    const { currentList, Chance } = this.state;
    const n = currentList.entries.length;
    const matches = [];
    let schedule = [];

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const matchIndices = [i, j];
        const shuffled = Chance.shuffle(matchIndices);
        matches.push(shuffled);
      }
    }

    schedule = Chance.shuffle(matches);

    this.setState({ schedule });
  }

  nextMatch = () => {
    const { schedule, currentList } = this.state;
    let { matchIndex } = this.state;
    const { entries } = currentList;
    matchIndex++;

    if (matchIndex === schedule.length) {
      // finish method
      console.log('result:', this.state.currentResult);
      this.setState({ currentMatch: {
        hero: { value: "", listIndex: -1 },
        villain: { value: "", listIndex: -1 }
      }})
      this.finish();
    } else {
      // update message method
      const heroIndex = schedule[matchIndex][0];
      const villainIndex = schedule[matchIndex][1];
      const currentMatch = {
        hero: { value: entries[heroIndex], index: heroIndex },
        villain: { value: entries[villainIndex], index: villainIndex }
      }

      this.setState({ currentMatch, matchIndex })
    }
  }

  pickWinner = (winnerIndex, loserIndex) => {
    const { currentResult } = this.state;
    currentResult.items[winnerIndex].points += 1;
    currentResult.items[winnerIndex].beats.push(loserIndex);
    this.nextMatch()
  }

  finish = () => {
    this.processResult();
    this.saveResult();
  }

  processResult() {
    // do something
  }

  saveResult() {
    const db = firebase.firestore();
    const result = this.state.currentResult;
    const resultRef = db.collection('results').doc(result.id);
    resultRef.set(result)
      .then(doc => {
        console.log('result added');
        this.markAsComplete();
      })
      .catch(err => { console.log(err)})
  }

  markAsComplete() {
    const db = firebase.firestore();
    const user = this.props.state.user;
    const { listId : currentListId } = this.state.currentList;
    // const listComplete = { listId: currentListId, completed: true };
    const listIndex = user.lists.findIndex(list => list.listId === currentListId);
    console.log(listIndex)
    user.lists[listIndex].completed = true;

    const userRef = db.collection('users').doc(user.uid);
    userRef.set(user)
      .then(doc => {
        this.setState({ user: doc.data() })
      })
      .catch(err => { console.log(err)})
  }

  render () {
    const { pageTitle, navButtons, currentMatch } = this.state;
    const showMatches = currentMatch.hero.listIndex !== -1;

    return (
      <div className="ListView">
        <Header pageTitle={pageTitle}/>
        { showMatches && 
          <div className="match-container nes-container is-dark">
            <MatchItem 
              pickWinner={this.pickWinner}
              winnerIndex={currentMatch.hero.index}
              loserIndex={currentMatch.villain.index}
              text={currentMatch.hero.value} 
            />
            <MatchItem 
              pickWinner={this.pickWinner}
              winnerIndex={currentMatch.villain.index}
              loserIndex={currentMatch.hero.index}
              text={currentMatch.villain.value} 
            />
          </div> }
        <footer>
          {/* <Message /> */}
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

export default withRouter(ListWar);
