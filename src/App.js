import './App.css';
import Home from './containers/Home'; 
import Signin from './containers/Signin'; 
import Signup from './containers/Signup'; 
import {BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
