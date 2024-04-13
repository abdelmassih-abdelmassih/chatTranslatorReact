import React, {useState } from 'react'
import socket from '../../socket'

export default function Input({setMessages, roomId}) {
  const [message, setMessage] = useState()

  const SendMessage = () => {
    setMessages(old => [...old, {message: message, sender: true}])
    socket.emit('send_private_message', {roomId: roomId,  message: message, senderId: localStorage.getItem('uid')});
    setMessage('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      SendMessage();
    }
  };

  return (
    <div className='input_container'>
        <input className="message_input" value={message} placeholder='Type message to send' onChange={(e) => {setMessage(e.target.value)}} onKeyPress={handleKeyPress}/>
        <button className='send_button' onClick={SendMessage}>Send</button>
    </div>
  )
}
