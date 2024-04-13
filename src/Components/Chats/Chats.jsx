import React, { useEffect, useState } from 'react'
import './Chats.css'
import ChatClick from './ChatClick'
import Footer from './Footer'
import { getAllUsers } from '../../services/functions'
import LanguageDropdown from '../../utils/LanguageDropdown'

export default function ChatsContainer({ activeUser, handleActiveUser, language, setLanguage }) {
  const [users, setUsers] = useState([])
  const [showConvs, setShowConvs] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers(); // Assuming getAllUsers is an async function
      setUsers(users);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const renderUsers = () => {
    return users.map((user, index) => {
      if (user.uid !== localStorage.getItem('uid')) {
        return (
          <ChatClick key={index} user={user} activeUser={activeUser} handleActiveUser={handleActiveUser} /> // Make sure to add a key for list items
        );
      }
    });
  };

  return (
    <div className='ChatsContainer'>
      <div className='ChatsContainerHeader'>
        <LanguageDropdown language={language} setLanguage={setLanguage} />
        {/* <input className='search_bar' type='text' placeholder='Search' />
        <button className='search_button'>Search</button> */}
        {/* <button onClick={() => setShowConvs(true)}>Conversations</button>
        <button onClick={() => setShowConvs(false)}>All Users</button> */}
      </div>
      <div className='ChatsContainerScroll'>
        {loading && <div className='loading-spinner'>Loading Convs ... max wait is 30 seconds because we are using free tier hosting for the API</div>}
        {renderUsers()}
        
      </div>
      <Footer />
    </div>
  )
}
