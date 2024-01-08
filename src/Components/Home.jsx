import React, { useEffect, useState, useRef  } from 'react'
import ChatsContainer from './Chats/Chats'
import ChatBox from './Chat/ChatBox'
import { useAuth } from '../services/useAuth'
import { enterNewRoom, generateRoomId, leaveRoom } from '../services/functions'
import socket from '../socket'

export default function Home() {
  const { logout } = useAuth()
  const [activeUser, setActiveUser] = useState([])
  const [tempUser, setTempUser] = useState({})
  const [roomId, setRoomId] = useState()

  const tempUserRef = useRef(tempUser);

  useEffect(() => {
    tempUserRef.current = tempUser;
  }, [tempUser]);

  // useEffect(() => {
  //   console.log("this is activeUser: ", activeUser)
  // }, [activeUser])

  // useEffect(() => {
  //   console.log("this is roomId: ", roomId)  
  // }, [roomId])

  // useEffect(() => {
  //   console.log("this is tempUser: ", tempUser)
  // }, [tempUser])

  const handleActiveUser = async (user) => {
    if (user.uid !== activeUser.uid) {
      try {
        await leaveRoom(roomId);
      } catch (error) {
        console.log(error);
      }
      console.log("this is handleActiveUser", user)
      setTempUser(user);
      setActiveUser([]);
      setRoomId();
      const roomid = generateRoomId(user.uid || 123)
      await enterNewRoom(roomid);
    }
  }

  useEffect(() => {
    socket.on('room_joined', (roomid) => {
      console.log("Successfully joined :", roomid);
      // console.log("Temp User :", tempUser);
      setRoomId(roomid)
      setActiveUser(tempUserRef.current)
      setTempUser([])
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off('room_joined');
    };
  }, []);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
          <path d="M17,7H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Zm0,4H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm2-9H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z" fill="#0096FF" className="color000000 svgShape"></path>
        </svg>
        <h4>ChatTranslator</h4>
        <button className='Logout_button' onClick={logout}>LogOut</button>
      </div>

      <div className='Home_container'>
        <ChatsContainer activeUser={activeUser} handleActiveUser={handleActiveUser} />
        <ChatBox activeUser={activeUser} setActiveUser={setActiveUser} roomId={roomId}/>
      </div>
    </>
  )
}
