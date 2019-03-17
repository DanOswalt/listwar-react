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

const Layout = ({state}) => {
  return (
  <div className="Layout">
    {state.loading && <div className="loading">Loading...</div>}
    <main>
      <Switch>
        <Route 
          exact 
          path="/"
          component={Home}
        />
        <Route 
          path="/create"
          render={()=> <Create state={state}/>}
        />
        <Route 
          path="/examples" 
          render={()=> <Examples state={state}/>}
        />
        <Route 
          path="/list"
          render={()=> <ListPages state={state}/>}
        />
        <Redirect to="/" />
      </Switch>
    </main>
    {/* blank space added to account for footer height */}
    <div className="footerpadding"></div>
  </div>
  )
}

export default withRouter(Layout);