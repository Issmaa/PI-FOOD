import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import {Switch,Route} from 'react-router';
import Home from './pages/Home.js';
import LandingPage from './pages/LandingPage.js';
import DetailRecipe from './pages/DetailRecipe';
import CreateRecipe from './pages/CreateRecipe.js';
import {getRecipes} from './redux/actions.js';


function App() {
const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getRecipes());
      setRefresh(false)
    },[dispatch,refresh])
  return (
    <div>
      <Switch>
      <Route exact path="/" render={() => <LandingPage/>}/>
      <Route path="/home" render={() => <Home/>}/>
      <Route path="/detail/:id" render={() => <DetailRecipe/>}/>
      <Route path="/create" render={() => <CreateRecipe setRefresh={setRefresh}/>} />
      </Switch>
    </div>
  );
}

export default App;
