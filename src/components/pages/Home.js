import React, {Component} from 'react';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      testMessage: "no message"
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="home-title nes-container is-centered is-dark">
          <h1>Super List War</h1>
        </div>
        <div className="home-menu-box">
          <ul className="home-menu">
            <li><button className="nes-btn">Play</button></li>
            <li><button className="nes-btn">New</button></li>
            <li><button className="nes-btn">Sign Up</button></li>
            <li><button className="nes-btn">Sign In</button></li>
            <li><button className="nes-btn">Completed</button></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home