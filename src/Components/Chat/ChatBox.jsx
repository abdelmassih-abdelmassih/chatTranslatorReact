import React, { useEffect, useState } from 'react'
import './Chat.css'
import Input from './Input'
import Messages from './Messages'
import socket from '../../socket.jsx'

export default function ChatBox({activeUser, setActiveUser}) {
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    console.log("this is chatbox",activeUser)
    socket.on('receive_message', (data)=>{
      setMessages((old)=>[...old, data])
    })
    return () => {
      socket.off('receive_message');
    };
  }, [socket])

  if (activeUser.length!== 0) {
    return (
      <div className='ChatBox_Container'>
        <div className='ChatBox_header'>
          <img className='Profile' src={activeUser.image} alt='Profile'/>
          <h3 className='Name'>{activeUser.name}</h3>
          <button className='exitChat_Button' onClick={() => setActiveUser([])}>Close</button>
        </div>
        <Messages messages={messages} />
        <Input setMessages={setMessages}/>
      </div>
    )
  } else {
    return (
      <div className='ChatBox_Container'>
      </div>
    )
  }
}

