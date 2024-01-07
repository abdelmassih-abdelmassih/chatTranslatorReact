import React, { useEffect, useState } from 'react'
import './Chats.css'
import ChatClick from './ChatClick'
import Footer from './Footer'
import { getAllUsers } from '../../services/functions'

export default function ChatsContainer({activeUser, handleActiveUser}) {
  const [users, setUsers] = useState([])
  const [convs, setConvs] = useState([])
  const [showConvs, setShowConvs] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers(); // Assuming getAllUsers is an async function
      setUsers(users);
    };
  
    const fetchConvs = async () => {
      const convs = await getAllConvs(); // Assuming getAllUsers is an async function
      setConvs(convs);
    };

    fetchUsers();
    fetchConvs();
  }, []);

  const renderUsers = () => {
    return users.map((user, index) => {
      if(user.uid !== localStorage.getItem('uid')){
        return (
          <ChatClick key={index} user={user} activeUser={activeUser} handleActiveUser={handleActiveUser} showConvs={showConvs}/> // Make sure to add a key for list items
        );
      }
    });
  };

  const renderConvs = () => {
    return convs.map((conv, index) => {
        return (
          <ChatClick key={index} user={conv} activeUser={activeUser} handleActiveUser={handleActiveUser} showConvs={showConvs}/> // Make sure to add a key for list items
        );
    });
  };
  
  return (
    <div className='ChatsContainer'>
      {/* <div className='ChatsContainerHeader'>
        <button onClick={() => setShowConvs(true)}>Conversations</button>
        <button onClick={() => setShowConvs(false)}>All Users</button>
      </div> */}
      <div className='ChatsContainerScroll'>
        {!showConvs && renderUsers()}
        {showConvs && renderConvs()}
      </div>
      <Footer />
    </div>
  )
}
