import React, { useEffect, useState } from 'react'
import './Chat.css'
import Input from './Input'
import Messages from './Messages'
import socket from '../../socket.jsx'
import { fetchMessages } from '../../services/functions.jsx'

export default function ChatBox({activeUser, setActiveUser, roomId}) {
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    console.log("this is chatbox",activeUser)
    socket.on('receive_private_message', (data)=>{
      setMessages((old)=>[...old, {
        read: false,
        senderId: data.senderId,
        text: data.message,
        timestamp: data.timestamp
      }])
      console.log(data)
    })
    return () => {
      socket.off('receive_message');
    };
  }, [socket])

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (activeUser.uid) {
          const messages = await fetchMessages(roomId);
          console.log(messages);
          setMessages(messages);
          // Handle the fetched messages as needed
        }
      } catch (error) {
        console.error("Error fetching messages: ", error);
        // You can also implement additional error handling logic here
      }
    };
  
    fetchData();
  }, [activeUser, roomId]);

  if (activeUser.length!== 0) {
    return (
      <div className='ChatBox_Container'>
        <div className='ChatBox_header'>
          <img className='Profile' src={activeUser.image} alt='Profile'/>
          <h3 className='Name'>{activeUser.name}</h3>
          <button className='exitChat_Button' onClick={() => setActiveUser([])}>Close</button>
        </div>
        <Messages messages={messages} />
        <Input setMessages={setMessages} roomId={roomId}/>
      </div>
    )
  } else {
    return (
      <div className='ChatBox_Container'>
      </div>
    )
  }
}

