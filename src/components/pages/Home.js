/*
Home 
*/
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
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}

export default Home