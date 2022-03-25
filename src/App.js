/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect  } from 'react';
import './App.css';
import Home from './containers/Home'; 
import { Products } from './containers/Products';
import { Orders } from './containers/Orders/index';
import Signin from './containers/Signin'; 
import Signup from './containers/Signup'; 
import {Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn, getInitialData } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { Category } from './containers/Category/index';
import { NewPage } from './containers/NewPage/index';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    console.log(`Data.js`);
    dispatch(getInitialData());
  }, []);
    
  return (
    <div className="App">
        <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/page" exact component={NewPage} />
            <PrivateRoute path="/products" component={Products} />
            <PrivateRoute path="/orders" component={Orders} />
            <PrivateRoute path="/category" component={Category} />
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
        </Switch>
    </div>
  );
}

export default App;
