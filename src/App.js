import React, { Component } from 'react';
import RoomWebSocket from './room_websocket';
import consumer from './cable';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentMessage: "",
      messages: [],
    }
  }

  componentDidMount() {
    this.fetchMessages()
    consumer.subscriptions.create(
    {
      channel: 'MessagesChannel'
    },
    {
      connected: () => {console.log('connected')},
      disconnected: () => {console.log('disconnected')},
      received: ({messages}) => {this.setState({messages: messages})},
    })
  };

  handleReceivedMessage = message => {
    this.setState({ messages: [...this.state.messages, message] })
  }

  componentWillUnmount() {
    consumer.disconnect()
  };

  fetchMessages = () => {
    fetch('http://localhost:3000/messages')
      .then(res => res.json())
      .then((messages) => {
        this.setState({ messages: messages })
      })
  }

  handleReceivedMessage = message => {
    this.setState({ messages: [...this.state.messages, message] })
  }

  mapMessages = () => {
    return this.state.messages.map((message, i) =>
      <li key={i}>{message.content}</li>)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: this.state.currentMessage})
    })
    e.target.reset();
  }

  updateMessage = (e) => {
    this.setState({currentMessage: e.target.value})
  }

  render() {
    console.log(this.state)
    return (
      <div className='App'>
        <h2>Messages</h2>
        <ul>
          {this.mapMessages()}
        </ul>
        <RoomWebSocket
          cableApp={this.props.cableApp}
          handleReceivedMessage={this.handleReceivedMessage}
        />
        <form onSubmit={this.handleSubmit}>
          <input name='message' type='text' onChange={this.updateMessage} />
          <input type='submit' value='Send message' />
        </form>
      </div>
    )
  }

}

export default App;
