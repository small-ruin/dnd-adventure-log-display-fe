import { useEffect, useState, createContext } from 'react';
import { Switch, Route, BrowserRouter as Router, useHistory } from 'react-router-dom';
import AdventureList from '../AdventureList';
import AdventureComp from '../Adventure';
import LogComp from '../Log';
import NotFound from '../404'
import { Urls, get } from '../../request'
import { Adventure } from '../../interface';

export const advsContext = createContext<Adventure[] | null>([]);

function App() {
  const [advs, setAdvs] = useState<Adventure[] | null>(null);
  const history = useHistory();
    
  useEffect(() => {
    get('/adventure').then(res => {
      setAdvs(res.data);
    }, err => {
      console.error(err);
      history.push(Urls.ERROR);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <advsContext.Provider value={advs}>
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
    </advsContext.Provider>

  );
}

export default App;
