import React from 'react'

export default function Message({content, sender}) {
  return (
    <div className={sender === true ? 'message sender_message' : 'message'}>
      {content}
    </div>
  )
}
