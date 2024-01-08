import React from 'react'
import Message from './Message'

export default function Messages({messages}) {

  const RenderMessages = () => {
      return messages.map((message)=>{
          return <Message content = {message.text} senderId={message.senderId} key={message.id}/>
      })
  }
  return (
    <div className='Messages'>
        {RenderMessages()}
    </div>
  )
}
