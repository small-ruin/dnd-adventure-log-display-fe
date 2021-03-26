import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdventureList from '../AdventureList';
import AdventureComp from '../Adventure';
import LogComp from '../Log';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/small-ruin/adventure/:id'>
          <AdventureComp
          ></AdventureComp>
        </Route>
        <Route path='/small-ruin/log/:id'>
          <LogComp />
        </Route>
        <Route path='/small-ruin/log/'>
          <AdventureList></AdventureList>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
