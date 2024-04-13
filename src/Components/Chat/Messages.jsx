import React, { useEffect, useRef } from 'react'
import Message from './Message'

export default function Messages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat on every update
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const RenderMessages = () => {
    return messages.map((message) => {
      return <Message content={message.text} senderId={message.senderId} id={message.id} />
    })
  }
  return (
    <div className='Messages'>
      {RenderMessages()}
      <div ref={bottomRef} />
    </div>
  )
}
