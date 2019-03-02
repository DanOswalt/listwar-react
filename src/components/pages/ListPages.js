import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import ListView from './List/ListView.js';
import ListNotFound from './List/ListNotFound.js';


const ListPages = props => (
  <div className="list">
    <h1>List</h1>
    <blockquote>Hitting this page directly should show not found, try again</blockquote>
    <Switch>
      <Route path={`${props.match.path}/:listId`} component={ListView} />
      <Redirect to={`${props.match.path}/notfound`} component={ListNotFound} />
    </Switch>
  </div>
)

export default ListPages