import React from 'react'
import Message from './Message'

export default function Messages({messages}) {

  const RenderMessages = () => {
      return messages.map((message)=>{
          return <Message content = {message.message} sender={message.sender}/>
      })
  }
  return (
    <div className='Messages'>
        {RenderMessages()}
    </div>
  )
}
