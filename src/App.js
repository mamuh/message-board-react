import React, { Component } from 'react';
import { ActionCable } from 'actioncable';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
    }
    // this.cable = ActionCable.createConsumer('ws://localhost:3000/cable')
  }

  componentDidMount() {
    this.fetchMessages()
    // this.createSubscription()
  }

  fetchMessages = () => {
    fetch('http://localhost:3000/messages')
      .then(res => res.json())
      .then((messages) => {
        console.log(messages)
        this.setState({ messages: messages })
      })
  }

  // createSubscription = () => {
  //   this.cable.subscriptions.create(
  //     { channel: 'MessagesChannel' },
  //     { received: message => this.handleReceivedMessage(message) }
  //   )
  // }

  handleReceivedMessage = message => {
    this.setState({ messages: [...this.state.messages, message] })
  }

  mapMessages = () => {
    return this.state.messages.map((message, i) =>
      <li key={i}>{message.content}</li>)
  }


  handleMessageSubmit = e => {
    console.log('submit')
    e.preventDefault();
    const messageObj = {
      message: {
        content: e.target.message.value
      }
    }
    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageObj)
    }
    fetch('http://localhost:3000/messages', fetchObj)
    e.target.reset()
  }

  render() {
    console.log(this.state)
    return (
      <div className='App'>
        <h2>Messages</h2>
        <ul>
          {this.mapMessages()}
        </ul>
        <form onSubmit={this.handleMessageSubmit}>
          <input name='message' type='text' />
          <input type='submit' value='Send message' />
        </form>
      </div>
    )
  }

}

        // <ActionCable
        //   channel={{ channel: 'MessagesChannel' }}
        //   onReceived={this.handleReceivedMessages}
        // />
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
