import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: "",
        rooms: []
      };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  handleChange(e) {
  this.setState({ name: e.target.value });
}

createRoom(e) {
  this.roomsRef.push({ name: this.state.name });
  this.setState({ name: "" });
}


  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

selectRoom(room) {
  this.props.activeRoom(room);
}

deleteRoom(room) {
  this.roomsRef.child(room.key).remove();
}

  render() {
    const roomList = this.state.rooms.map((room) =>
    <div>
      <li key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}</li>
      <button key={room.key} onClick={(e) => this.deleteRoom(room)}>{"Delete " + room.name}</button>
      </div>
    );

    const roomForm = (
    <form onSubmit={this.createRoom}>
      <input type="text" value={this.state.name} placeholder="Create new room" onChange={this.handleChange}/>
      <input type="submit" value="Create" />
    </form>
  );

    return(
      <div>
      {roomForm}
      <h4>Existing rooms</h4>
      <ul>{roomList}</ul>
      </div>
    );
  }
}

export default RoomList;
