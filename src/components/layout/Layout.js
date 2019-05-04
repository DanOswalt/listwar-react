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
import MyLists from '../pages/MyLists.js';
import ListView from '../pages/List/ListView.js';
import ListWar from '../pages/List/ListWar.js';
import MyResult from '../pages/List/MyResult.js';
import AllResults from '../pages/List/AllResults.js';
import Share from '../pages/List/Share.js';
import ChangeName from '../pages/ChangeName.js';

const Layout = ({appState, match, ...props}) => {
  return (
  <div className="Layout">
    {appState.loading && <div className="loading">Loading...</div>}
    <main>
      <Switch>
        <Route 
          exact 
          path="/"
          render={()=> <Home alias={appState.user.alias}/>}
        />
        <Route 
          path="/changeName"
          render={()=> <ChangeName changeAlias={props.changeAlias} alias={appState.user.alias}/>}
        />
        <Route 
          path="/create"
          render={
            ()=> (
              <Create 
                createNewList={props.createNewList} 
                alias={appState.user.alias} 
                resetCurrents={props.resetCurrents}/>
              )
            }
        />
        <Route 
          path="/examples" 
          render={()=> <Examples/>}
        />
        <Route 
          path="/mylists" 
          render={
            () => (
              <MyLists
                user={appState.user}
                alias={appState.user.alias}
                resetCurrents={props.resetCurrents}
                toggleLoading={props.toggleLoading}
              />
            )
          }
        />
        <Route 
          path="/list/:listId/:slug/war"
          render={
            () => (
              <ListWar
                user={appState.user}
                alias={appState.user.alias}
                currentList={appState.currentList}
                saveResult={props.saveResult}
              />
            )
          }
        />
        <Route 
          exact
          path="/list/:listId/:slug/myResult"
          render={
            () => (
              <MyResult
                user={appState.user}
                alias={appState.user.alias}
                currentList={appState.currentList}
                currentResult={appState.currentResult}
                getCurrentResult={props.getCurrentResult}
                resetCurrents={props.resetCurrents}
                toggleLoading={props.toggleLoading}
              />
            )
          }
        />
        <Route 
          exact
          path="/list/:listId/:slug/allResults"
          render={
            () => (
              <AllResults
                user={appState.user}
                alias={appState.user.alias}
                allResults={appState.allResults}
                getAllResultsByListId={props.getAllResultsByListId}
                toggleLoading={props.toggleLoading}
              />
            )
          }
        />
        <Route 
          exact
          path="/list/:listId/:slug/share"
          render={
            () => (
              <Share
                user={appState.user}
                alias={appState.user.alias}
                currentList={appState.currentList}
              />
            )
          }
        />
        {/* <Route  
          exact
          path="/list/:listId/:slug/allResults"
          render={
            () => (
              <MyResult
                user={appState.user}
                alias={appState.user.alias}
                allResults={appState.allResults}
                getCurrentList={props.getCurrentList}
                toggleLoading={props.toggleLoading}
              />
            )
          }
        /> */}
        <Route 
          path="/list/:listId/:slug"
          render={
            () => (
              <ListView
                user={appState.user}
                alias={appState.user.alias}
                currentList={appState.currentList}
                getCurrentList={props.getCurrentList}
                toggleLoading={props.toggleLoading}
              />
            )
          }
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