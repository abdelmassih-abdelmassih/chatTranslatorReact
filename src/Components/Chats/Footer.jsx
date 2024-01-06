import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Footer() {
    return (
        <div className='Chats_Footer'>
            ID: {uuidv4()}
        </div>
    )
}
