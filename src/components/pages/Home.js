import React, {Component} from 'react';
import db from '../../firebase/firebaseInit.js';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      testMessage: "no message"
    }
  }

  componentDidMount () {
    const ref = db.collection("test").doc("testMessage");

    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          testMessage: doc.data().message
        })
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Test Message: {this.state.testMessage}</p>
      </div>
    )
  }
}

export default Home