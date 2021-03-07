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
        <Route path='/adventure/:id'>
          <AdventureComp
          ></AdventureComp>
        </Route>
        <Route path='/log/:id'>
          <LogComp />
        </Route>
        <Route path='/'>
          <AdventureList></AdventureList>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
