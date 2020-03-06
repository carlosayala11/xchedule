import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login.js'
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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Login></Login>
    </div>
  );
}

export default App;
