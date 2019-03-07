import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import MainHeader from './MainHeader.js';
import MainNav from './MainNav.js';
import Message from './Message.js';
import Home from '../pages/Home.js';
import ListPages from '../pages/ListPages.js';
import Create from '../pages/Create.js';
import Examples from '../pages/Examples.js';
import SignUp from '../auth/SignUp.js';
import SignIn from '../auth/SignIn.js';
import SignOut from '../auth/SignOut.js';

const Layout = (props) => {
  return (
  <div className="layout">
    {props.state.loading && <div className="loading">Loading...</div>}
    <header>
      <MainHeader 
        guest={props.state.guest}
      />
    </header>
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
        <Route
          path="/signin"
          render= {() => <SignIn onSubmit={props.signInWithEmail} history={props.history}/>}
        />
        <Route 
          path="/signup" 
          render= {() => <SignUp onSubmit={props.signUpWithEmail}/>}
        />
        <Route 
          path="/signout" 
          render= {() => <SignOut onSubmit={props.signOut}/>}
        />
        <Redirect to="/" />
      </Switch>
    </main>
    <footer>
      <Message />
      <MainNav />
    </footer>
  </div>
)}

export default withRouter(Layout);