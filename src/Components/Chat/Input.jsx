import React, {useState } from 'react'
import socket from '../../socket'

export default function Input({setMessages, roomId}) {
  const [message, setMessage] = useState()

  const SendMessage = () => {
    socket.emit('send_private_message', {roomId: roomId,  message: message, senderId: localStorage.getItem('uid')});
    setMessages(old => [...old, {message: message, sender: true}])
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
