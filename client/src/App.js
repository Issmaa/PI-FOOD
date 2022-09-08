import './App.css';
import {Switch,Route} from 'react-router';
import Home from './pages/Home.js';
import LandingPage from './pages/LandingPage.js';
import DetailRecipe from './pages/DetailRecipe';
import CreateRecipe from './pages/CreateRecipe.js';
import {useDispatch} from 'react-redux';
import { useEffect} from 'react';
import { getRecipes} from './redux/actions.js';


function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getRecipes());
  },[dispatch])
 
  return (
    <div>
      <Switch>
      <Route exact path="/" render={() => <LandingPage/>}/>
      <Route path="/home" render={() => <Home/>}/>
      <Route path="/detail/:id" render={() => <DetailRecipe/>}/>
      <Route path="/create" render={() => <CreateRecipe/>} />
      </Switch>
    </div>
  );
}

export default App;
