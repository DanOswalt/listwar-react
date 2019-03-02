import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MainHeader from './MainHeader.js';
import MainNav from './MainNav.js';
import Dialogue from './Dialogue.js';
import Home from '../pages/Home.js';
import ListPages from '../pages/ListPages.js';
import Create from '../pages/Create.js';
import Examples from '../pages/Examples.js';

const Layout = () => (
  <div className="layout">
    <MainHeader />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path ="/create" component={Create} />
        <Route path ="/examples" component={Examples} />
        <Route path ="/list" component={ListPages} />
        <Redirect to="/" />
      </Switch>
    </main>
    <Dialogue />
    <MainNav />
  </div>
)

export default Layout