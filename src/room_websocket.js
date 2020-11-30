import React, { Component } from 'react';

class RoomWebSocket extends Component {
  componentDidMount() {
    this.props.cableApp.cable.subscriptions.create(
      {
        channel: 'MessagesChannel'
      },
      {
        received: (data) => {this.props.handleReceivedMessage(data)}
      }
    )
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default RoomWebSocket
