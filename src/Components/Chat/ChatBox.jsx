import React, { useEffect, useState } from 'react'
import './Chat.css'
import Input from './Input'
import Messages from './Messages'
import socket from '../../socket.jsx'

export default function ChatBox() {
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    socket.on('receive_message', (data)=>{
      setMessages((old)=>[...old, data])
    })
  }, [socket])

  return (
    <div className='ChatBox_Container'>
      <div className='ChatBox_header'>
        <img className='Profile' src="https://firebasestorage.googleapis.com/v0/b/abdelmassih-portfolio.appspot.com/o/profile3.jpeg?alt=media&token=bd03b03e-0848-4882-b9c5-c2dae4efe081" />
        <h3 className='Name'>Friend's name</h3>
      </div>
      <Messages messages= {messages} />
      <Input setMessages={setMessages}/>
    </div>
  )
}
