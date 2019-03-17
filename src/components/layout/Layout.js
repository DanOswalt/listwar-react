import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import Home from '../pages/Home.js';
import ListPages from '../pages/ListPages.js';
import Create from '../pages/Create.js';
import Examples from '../pages/Examples.js';

const Layout = ({...props}) => {
  return (
  <div className="Layout">
    {props.state.loading && <div className="loading">Loading...</div>}
    <main>
      <Switch>
        <Route 
          exact 
          path="/"
          component={Home}
        />
        <Route 
          path="/create" 
          component={Create} 
        />
        <Route 
          path="/examples" 
          component={Examples} 
        />
        <Route 
          path="/list" 
          component={ListPages} 
        />
        <Redirect to="/" />
      </Switch>
    </main>
    <div className="footerpadding"></div>
  </div>
  )
}

export default withRouter(Layout);