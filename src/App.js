import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList  from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
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
  constructor(props) {
  super(props);
  this.state = {activeRoom: "", user: null};
  this.activeRoom = this.activeRoom.bind(this);
  this.setUser = this.setUser.bind(this);
}

activeRoom(room) {
this.setState({ activeRoom: room })
}

setUser(user) {
  this.setState({ user: user });
}
  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div>
      <div className="check">
        <h1>{this.state.activeRoom.name != undefined? "You selected " + this.state.activeRoom.name : "Select a Room"}</h1>
        <User firebase={firebase} setUser={this.setUser} />
        <RoomList firebase={firebase} activeRoom={this.activeRoom} />
        </div>
        { showMessages ?
        (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>)
        : (null)
        }
      </div>
    );
  }
}

export default App;
