import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdventureList from '../AdventureList';
import AdventureComp from '../Adventure';
import LogComp from '../Log';
import NotFound from '../404'
import { Urls } from '../../request'

function App() {
  return (
    <Router>
      <Switch>
        <Route path={Urls.ADVENTURE}>
          <AdventureComp
          ></AdventureComp>
        </Route>
        <Route path={Urls.LOG}>
          <LogComp />
        </Route>
        <Route path={Urls.ROOT}>
          <AdventureList></AdventureList>
        </Route>
        <Route path={Urls.ADVENTURE_LIST}>
          <AdventureList></AdventureList>
        </Route>
        <Route path={Urls.NOT_FOUND}>
          <NotFound></NotFound>
        </Route>
        <Route path={Urls.ERROR}>
          <div>出错了！</div>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
