import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList  from './components/RoomList.js';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC-SMH8zGygeHYrea2hYHRs3G0Vzi2LwSA",
    authDomain: "bloc-chat-react-a5882.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-a5882.firebaseio.com",
    projectId: "bloc-chat-react-a5882",
    storageBucket: "bloc-chat-react-a5882.appspot.com",
    messagingSenderId: "331013340519"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div>
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
