import React, { useState } from 'react'

export default function ChatClick({ user, activeUser, handleActiveUser, showConvs}) {
  const [showEmail, setShowEmail] = useState(false)

  return (
    <div onClick={() => handleActiveUser(user)} onMouseEnter={() => setShowEmail(true)} onMouseLeave={() => setShowEmail(false)} className={'ChatClick' + (user === activeUser ? '' : 'active')}>
      {showEmail && user.email}
      {!showEmail && user.name}
    </div>
    // <div className={'ChatClick' + (user === activeUser ? '' : 'active')} onClick={() => handleActiveUser(user)} title={user.email}>
    //   {user.name}
    // </div>
  )
}
