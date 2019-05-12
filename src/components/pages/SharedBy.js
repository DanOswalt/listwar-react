import React, { Component} from 'react';
import Header from '../layout/Header';
import NavButtons from '../layout/NavButtons.js';
import { Link, withRouter } from 'react-router-dom';

class SharedBy extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      pageTitle: `"${match.params.sharedby}" invited you to a listwar!`,
      navButtons: {
        back: {
          text: "Back",
          route: "#",
          disabled: true,
          action: null
        },
        share: {
          text: "Invite",
          route: "#",
          disabled: true,
          action: null
        },
        confirm: {
          text: "Ok!",
          route: `/list/${match.params.listId}/${match.params.slug}`,
          disabled: false,
          action: null
        } 
      }
    }
  }

  componentDidMount () {
    // this.props.resetCurrents();
  }

  render () {
    const { pageTitle, navButtons } = this.state;
    const { user, alias } = this.props;
    
    return (
      <div className="SharedBy">
        <Header 
          pageTitle={pageTitle}
          alias={alias}
        />
        <h5 className="nes-text">Click "ok!" to war their list.</h5>
        <br/>
        <div className="list-view-container">
          <div className="nes-container with-title is-rounded is-dark change-name-box ">
            <p className="title">Wait! Change name?</p>
            <p className="instructions">You are playing as:</p>
            <div className="name-change">
              <i className="nes-icon is-small star"></i>
              <span className="nes-text alias">{alias}</span>
              <i className="nes-icon is-small star"></i>
            </div>
            <br/>
            <Link to={`/changeName`}>
              <div className="nes-btn">Change Name</div>
            </Link>
          </div>
        </div>
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

export default withRouter(SharedBy);
