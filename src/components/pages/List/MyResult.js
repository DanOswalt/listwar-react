import React, { Component} from 'react';
import Header from '../../layout/Header';
import NavButtons from '../../layout/NavButtons.js';
import ResultsList from './ResultsList.js';
// import { Trail } from 'react-spring/renderprops';
import { withRouter } from 'react-router-dom';

class MyResult extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "Final Result:",
      navButtons: {
        back: {
          text: "Home",
          route: "/",
          disabled: false,
          action: null
        },
        share: {
          text: "Share",
          route: `/list/${match.params.listId}/${match.params.slug}/share`,
          disabled: false,
          action: null
        },
        confirm: {
          text: "Compare",
          route: `/list/${match.params.listId}/${match.params.slug}/allResults`,
          disabled: false,
          action: null
        } 
      }
    }
  }

  componentDidMount () {
    const { match, toggleLoading } = this.props;
    toggleLoading();

    setTimeout(() => {
      this.props.getCurrentResult(match.params.listId, match.params.slug);
    }, 1000)
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { currentResult, alias } = this.props;

    const entries = currentResult.items.map((item, index) => {
      const { rank, value, wins } = item;
      const rankElm = rank === 1 ? <i class="nes-icon trophy is-small"></i> : <span>{rank}.</span>;
      const resultItem = `${value} (${wins} pts)`;
      return <div><span className="rank-box">{rankElm}</span><li className="result-entry" key={rank}>{resultItem}</li></div>;
    })
    const listTitle = currentResult.title;
    const numItems = entries.length;
    const listExists = numItems > 0;
    const resultAlias = currentResult.alias;

    const list = <ResultsList alias={resultAlias} title={listTitle} entries={entries} />

    return (
      <div className="MyResults">
        <Header 
          pageTitle={pageTitle}
          alias={alias}
        />
        { listExists && list }
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

export default withRouter(MyResult);
