import React, { Component } from 'react';
import Moment from 'react-moment';
import '../styles/MessageList.css';

export class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = { username: "",
      message: "",
      sentAt: "",
      roomId: "",
      messages: []};

      this.messagesRef = this.props.firebase.database().ref("messages");
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user,
      message: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
        console.log(this.props.user)
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      message: this.state.message,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({ username: "",
     message: "",
     sentAt: "",
     roomId: "" });
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;

    const messageBar = (
      <form onSubmit={this.createMessage}>
        <input type="text" value={this.state.message} placeholder="Enter Message" onChange={this.handleChange}/>
        <input type="submit" value="Send" />
      </form>
    );

    const messageList = (
      this.state.messages.map((message) => {
        if (message.roomId === activeRoom) {
          return <div> <div className="center"> <h3 key={message.key}>{message.username} </h3>
          <h4> {message.message} </h4> </div>
          <h4 className="time"><Moment fromNow>{message.sentAt}</Moment> </h4>
          </div>

        }
        return null;
      })
    );

    return(
      <div>
        <div>{messageBar}</div>
        <ul>{messageList}</ul>
      </div>
    );
  }
}

export default MessageList;
