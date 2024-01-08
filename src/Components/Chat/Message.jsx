import React from 'react'

export default function Message({ content, senderId, key }) {
  console.log()
  return (
    <div key={key} className={senderId === localStorage.getItem('uid') ? 'message sender_message' : 'message'}>
      {content}
    </div>
  )
}
