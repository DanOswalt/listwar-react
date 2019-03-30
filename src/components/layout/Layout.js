import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import Home from '../pages/Home.js';
import Create from '../pages/Create.js';
import Examples from '../pages/Examples.js';
import ListView from '../pages/List/ListView.js';

const Layout = ({state, ...props}) => {
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
          render={()=> <Create state={state} createNewList={props.createNewList}/>}
        />
        <Route 
          path="/examples" 
          render={()=> <Examples state={state}/>}
        />
        <Route 
          path="/list/:listId/:slug"
          render={()=> <ListView state={state}/>}
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