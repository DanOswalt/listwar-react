import React, { Component} from 'react';
import Header from '../../layout/Header';
import NavButtons from '../../layout/NavButtons.js';
import MatchItem from './MatchItem.js';
import { withRouter } from 'react-router-dom';
import chance from 'chance';

class ListWar extends Component {
  constructor(props) {
    super(props);

    const { match } = props;

    this.state = {
      Chance: new chance(),
      pageTitle: "War!",
      navButtons: {
        back: {
          text: "Reset",
          route: `/list/${match.params.listId}/${match.params.slug}`,
          disabled: false,
          action: null
        },
        share: {
          text: "Invite",
          route: "#",
          disabled: true,
          action: null
        },
        confirm: {
          text: "Complete",
          route: "#",
          disabled: true,
          action: null
        } 
      },
      clickAble: true,
      currentResult: null,
      schedule: [],
      currentMatch: {
        hero: { value: "", listIndex: -1 },
        villain: { value: "", listIndex: -1 }
      },
      matchIndex: -1,
      remaining: -1,
      animation: "enter",
      heroFrom: { marginLeft: 0, opacity: 0 },
      heroTo: { marginLeft: 25 , opacity: 1},
      heroDelay: "400",
      villainFrom: { marginLeft: 0, opacity: 0 },
      villainTo: { marginLeft: 25 , opacity: 1 },
      villainDelay: "400"
    }
  }

  componentDidMount() {
    const { match } = this.props;
    setTimeout(() => {
      if (this.props.currentList) {
        this.createInitialEmptyResult();
        this.createSchedule();
        if (this.state.schedule.length > 0) {
          this.nextMatch();
        } else {
          this.props.history.push(`/list/${match.params.listId}/${match.params.slug}`);
        }
      }
    }, 0);
  }

  createInitialEmptyResult = () => {
    const { currentList, user } = this.props; 

    const currentResult = {
      id: currentList.listId + user.uid + user.alias, 
      title: currentList.title,
      items: currentList.entries.map((value, index) => {
        return {
          value: value,
          wins: 0,
          points: 0,
          id: index,
          beats: [],
          rank: null
        }
      }),
      alias: user.alias,
      listId: currentList.listId,
      url: `list/${currentList.listId}/${currentList.slug}/myResult`
    }

    this.setState({ currentResult });
  }

  createSchedule = () => {
    const { currentList } = this.props;
    const { Chance } = this.state;
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

    this.setState({ schedule, remaining: schedule.length + 1 });
  }

  nextMatch = () => {
    const { schedule } = this.state;
    const { currentList } = this.props;
    let { matchIndex, remaining } = this.state;
    const { entries } = currentList;
    matchIndex++;
    remaining--;

    if (matchIndex > 0 && matchIndex === schedule.length) {
      console.log('result:', this.state.currentResult);
      this.setState({ currentMatch: {
        hero: { value: "", listIndex: -1 },
        villain: { value: "", listIndex: -1 }
      }});
      this.finish();
    } else {
      // update message method
      const heroIndex = schedule[matchIndex][0];
      const villainIndex = schedule[matchIndex][1];
      const currentMatch = {
        hero: { value: entries[heroIndex], index: heroIndex },
        villain: { value: entries[villainIndex], index: villainIndex }
      };

      this.setState({ currentMatch, matchIndex, remaining });
    }
  }

  toggleClickable = () => {
    this.setState({ clickAble: !this.state.clickAble });
  }

  pickWinner = (winnerIndex, loserIndex, heroWins) => {
    const { currentResult, clickAble } = this.state;

    if (clickAble) {
      const winner = currentResult.items[winnerIndex];
      winner.wins += 1;
      winner.points += 1;
      winner.beats.push(loserIndex);
      // this.toggleClickable();
      this.leaveAnimation(heroWins);
      
      setTimeout(() => {
        //this.toggleClickable(); //clickable setting new?
        this.enterAnimation();
        this.nextMatch();
      }, 1000);
    }
  }

  finish = () => {
    const result = this.processResult();
    this.props.saveResult(result, this.props.currentList.listId, this.props.currentList.listSlug);
  }

  processResult() {
    const result = JSON.parse(JSON.stringify(this.state.currentResult));
    const pointsTiers = {};   
    const _descByPoints = (a, b) => b.points - a.points;

    const _setItemRank = (item, index) => item.rank = index + 1;

    const _createPointsTiers = item => {
      const pts = item.points;
      if (!pointsTiers[pts]) {
        pointsTiers[pts] = []
      }
      pointsTiers[pts].push(item.id);
    }

    result.items.forEach(_createPointsTiers);
    this.doHeadToHeadTiebreaks(pointsTiers, result);

    // result.items.forEach(_createPointsTiers);
    // this.doBestBeatComparisonTiebreak(pointsTiers, result);

    result.items.forEach(_createPointsTiers);
    this.doRandomTiebreak(pointsTiers, result);

    result.items.sort(_descByPoints);
    result.items.forEach(_setItemRank);

    return result;
  }

  doHeadToHeadTiebreaks(pointsTiers, result) {
    for (const tier in pointsTiers) {
      const tiedPlayers = pointsTiers[tier];
      if (tiedPlayers.length === 1) return;

      tiedPlayers.forEach(heroId => {
        const hero = result.items[parseInt(heroId)];
        tiedPlayers.forEach(villainId => {
          if (hero.beats.includes(villainId)) {
            hero.points += 0.1;
          }
        })
      })
    }
    // console.log("h2h tiebreaks", result);
  }

  // doBestBeatComparisonTiebreak(pointsTiers, result) {
  //   for (const tier in pointsTiers) {
  //     const tiedPlayers = pointsTiers[tier];
  //     const comparatorIndex = 0;

  //     if (tiedPlayers.length === 1) return;

  //     tiedPlayers.forEach(heroId => {
  //       const hero = result.items[parseInt(heroId)];
  //       hero.beats.sort((a, b) => {
  //         const beatA = result.items[parseInt(a)];
  //         const beatB = result.items[parseInt(b)];

  //         return beatB.points - beatA.points;
  //       });
  //     });
  //   }
  //   // console.log("bb tiebreaks", result);
  // }

  doRandomTiebreak(pointsTiers, result) {
    for (const tier in pointsTiers) {
      const tiedPlayers = pointsTiers[tier];
      if (tiedPlayers.length === 1) return;
      tiedPlayers.forEach(heroId => {
        const hero = result.items[parseInt(heroId)];
        hero.points += Math.random() * .001;
      })
    }
  }

  enterAnimation = () => {
    const enter = {
      from: { 
        marginLeft: 0,
        opacity: 0
      },
      to: { 
        marginLeft: 25,
        opacity: 1
      },
      delay: "0"
    }

    this.setState({
      animation: "enter",
      heroFrom: enter.from,
      heroTo: enter.to,
      heroDelay: enter.delay,
      villainFrom: enter.from,
      villainTo: enter.to,
      villainDelay: enter.delay,
      clickAble: !this.state.clickAble
    });
  }

  leaveAnimation = (heroWins) => {
    const leaveWinner = {
      from: { 
        opacity: 1,
        backgroundColor: 'white',
        transform: 'scale(1.2)'
      },
      to: { 
        opacity: 0,
        backgroundColor: '#9acd32',
        transform: 'scale(1)'
      },
      delay: "400"
    }

    const leaveLoser = {
      from: { 
        opacity: 1
      },
      to: { 
        opacity: 0
      },
      delay: "0"
    }

    this.setState({
      animation: "leave",
      heroFrom: heroWins ? leaveWinner.from : leaveLoser.from,
      heroTo: heroWins ? leaveWinner.to : leaveLoser.to,
      heroDelay: heroWins ? leaveWinner.delay : leaveLoser.delay,
      villainFrom: !heroWins ? leaveWinner.from : leaveLoser.from,
      villainTo: !heroWins ? leaveWinner.to : leaveLoser.to,
      villainDelay: !heroWins ? leaveWinner.delay : leaveLoser.delay,
      clickAble: !this.state.clickAble
    })
  }

  render () {
    const { pageTitle, navButtons, remaining, currentMatch, heroFrom, heroTo, heroDelay, villainFrom, villainTo, villainDelay, animation } = this.state;
    const { alias } = this.props;
    const showMatches = currentMatch.hero.listIndex !== -1;

    return (
      <div className="ListWar">
        <Header pageTitle={pageTitle} alias={alias}/>
        { showMatches &&
          <> 
            <div className="match-container">
              <div className="countDown">
                <i class="nes-icon is-small trophy"></i>
                  <span className="nes-text remaining">{remaining} remaining</span>
                <i class="nes-icon is-small trophy"></i>
              </div>
              <br/>
              <MatchItem 
                pickWinner={this.pickWinner}
                winnerIndex={currentMatch.hero.index}
                loserIndex={currentMatch.villain.index}
                text={currentMatch.hero.value}
                isHero={true}
                animation={animation}
                from={heroFrom}
                to={heroTo}
                delay={heroDelay}
              />
              <MatchItem 
                pickWinner={this.pickWinner}
                winnerIndex={currentMatch.villain.index}
                loserIndex={currentMatch.hero.index}
                text={currentMatch.villain.value}
                isHero={false}
                animation={animation}
                from={villainFrom}
                to={villainTo}
                delay={villainDelay}
              />
            </div>
          </>
        }
        <footer>
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
