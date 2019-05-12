import React, { Component} from 'react';
import Header from '../../layout/Header';
import NavButtons from '../../layout/NavButtons.js';
import ResultsList from './ResultsList.js';
import { Trail } from 'react-spring/renderprops';
import { withRouter } from 'react-router-dom';

class AllResults extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: "All results for this list:",
      navButtons: {
        back: {
          text: "Back",
          route: `/list/${match.params.listId}/${match.params.slug}/myResult`,
          disabled: false,
          action: null
        },
        share: {
          text: "Invite",
          route: `/list/${match.params.listId}/${match.params.slug}/share`,
          disabled: false,
          action: null
        },
        confirm: {
          text: "Compare",
          route: "#",
          disabled: true,
          action: null
        } 
      }
    }
  }

  componentDidMount () {
    const { match, toggleLoading, getAllResultsByListId } = this.props;
    toggleLoading();

    setTimeout(() => {
      getAllResultsByListId(match.params.listId, match.params.slug);
    }, 0)
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { allResults, alias } = this.props;

    const lists = allResults.map(result => {
      const entries = result.items.map((item, index) => {
        const { rank, value, wins } = item;
        const rankElm = rank === 1 ? <i class="nes-icon trophy is-small"></i> : <span>{rank}.</span>;
        const resultItem = `${value} (${wins} pts)`;
        return <div><span className="rank-box">{rankElm}</span><li className="result-entry" key={rank}>{resultItem}</li></div>;
      })
      const listTitle = result.title;
      const resultAlias = result.alias;

      return (
        <li className="results-list-item">
          <ResultsList alias={resultAlias} title={listTitle} entries={entries} />
        </li>
      )
    })

    return (
      <div className="AllResults">
        <Header 
          pageTitle={pageTitle}
          alias={alias}
        />
        <ul className="results-lists">
          { lists.length > 0 &&
            <Trail
              items={lists}
              keys={clip => clip}
              from={{ marginTop: 50, opacity: 0 }}
              to={{ marginTop: 0, opacity: 1 }}>
              {clip => props => (
                <div style={props} className="animated-clip">
                  {clip}
                </div>
              )}
            </Trail>  
          }
        </ul>
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

export default withRouter(AllResults);
