import React from 'react'

export default function Message({ content, senderId, id }) {
  console.log()
  return (
    <div key={id} className={senderId === localStorage.getItem('uid') ? 'message sender_message' : 'message'}>
      {content}
    </div>
  )
}
