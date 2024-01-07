import React, { useEffect, useState } from 'react'
import './Chats.css'
import ChatClick from './ChatClick'
import Footer from './Footer'
import { getAllUsers } from '../../services/functions'

export default function ChatsContainer() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers(); // Assuming getAllUsers is an async function
      setUsers(users);
    };
  
    fetchUsers();
  }, []);

  const renderUsers = () => {
    return users.map((user, index) => {
      return (
        <ChatClick key={index} user={user} /> // Make sure to add a key for list items
      );
    });
  };
  
  return (
    <div className='ChatsContainer'>
      <div className='ChatsContainerScroll'>
        {users && renderUsers()}
      </div>
      <Footer />
    </div>
  )
}
