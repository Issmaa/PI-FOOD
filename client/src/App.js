import './App.css';
import {Route} from 'react-router';
import Home from './pages/Home.jsx';
import LandingPage from './pages/LandingPage';



function App() {

 
  return (
    <div>
      <Route exact path="/" render={() => <LandingPage/>}/>
      <Route path="/home" render={() => <Home/>}/>
    </div>
  );
}

export default App;
