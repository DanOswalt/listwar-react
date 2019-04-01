import React, { Component} from 'react';
import Header from '../../layout/Header';
import Message from '../../layout/Message.js';
import NavButtons from '../../layout/NavButtons.js';
import chance from 'chance';

class ListWar extends Component {
  constructor(props) {
    super(props);

    const mockList = {
      title: "Mock List",
      entries: [
        "apples",
        "pears",
        "bananas",
        "oranges"
      ]
    }

    this.state = {
      Chance: new chance(),
      pageTitle: "War!",
      // currentList: props.state.currentList,
      currentList: mockList,
      currentResult: {
        // listId: this.listId,
        items: props.state.currentList.entries.map((value, index) => {
          return {
            value: value,
            points: 0,
            id: index,
            beats: [],
            rank: null
          }
        })
      },
      schedule: [],
      currentMatch: {

      },
      matchIndex: 0,
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
        console.log('start')
        this.createSchedule();
        this.nextMatch();
      }
    }, 1000);
  }

  createSchedule() {
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

  nextMatch() {
    const { schedule, matchIndex, currentList } = this.state;
    const { entries } = currentList;

    if (matchIndex > entries.length) {
      // finish method
      console.log('all done');
    } else {
      // update message method
      console.log(schedule)
      const heroIndex = schedule[matchIndex][0];
      const villainIndex = schedule[matchIndex][1];
      const currentMatch = {
        hero: { value: entries[heroIndex], listIndex: heroIndex },
        villain: { value: entries[villainIndex], listIndex: villainIndex }
      }

      this.setState({
        currentMatch
      })

    }
  }

  pickWinner (winnerIndex, loserIndex) {
    const { currentResult } = this.state;
    currentResult.items[winnerIndex].points += 1
    currentResult.items[winnerIndex].beats.push(loserIndex)
    this.nextBattle()
  }

  render () {
    const { pageTitle, navButtons } = this.state;

    return (
      <div className="ListView">
        <Header 
          pageTitle={pageTitle} 
        />
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

export default ListWar;
