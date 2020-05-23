import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from './pages/Login.js'
import LandingPage from './pages/LandingPage.js'
import Profile from './pages/Profile.js'
import Home from './pages/Home.js'
import Appointment from './pages/Appointment.js'
import CreateBusiness from './pages/CreateBusiness.js'
import UpdateBusiness from './pages/UpdateBusiness.js'
import ViewAllBusiness from './pages/ViewAllBusiness.js'
import ManageBusiness from './pages/ManageBusiness.js'
import ViewBusiness from './pages/ViewBusiness.js'

import Search from './pages/Search.js'
var firebase = require('firebase');

firebase.initializeApp({
    apiKey: "AIzaSyC7S6YxCC9enhXCjTz6mFOt9s4lLUbqero",
    authDomain: "schedule-app-e5da3.firebaseapp.com",
    databaseURL: "https://schedule-app-e5da3.firebaseio.com",
    projectId: "schedule-app-e5da3",
    storageBucket: "schedule-app-e5da3.appspot.com",
    messagingSenderId: "65387294795",
    appId: "1:65387294795:web:705d0e2a3d314cc4c79dce",
    measurementId: "G-3792TC93PV"
 });




function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/appointment">
            <Appointment />
          </Route>
            <Route exact path="/business/all">
            <ViewAllBusiness />
          </Route>
          <Route exact path="/business/create">
            <CreateBusiness />
          </Route>
            <Route exact path="/business/update">
            <UpdateBusiness />
          </Route>
          <Route exact path="/business/search">
            <Search />
          </Route>
          <Route exact path="/business/manage">
            <ManageBusiness />
          </Route>
          <Route exact path="/business/details">
            <ViewBusiness />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;