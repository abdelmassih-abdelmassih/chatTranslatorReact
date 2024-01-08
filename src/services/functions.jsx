import axios from 'axios'
import socket from '../socket'

export const getAllUsers = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/listusers')
        // console.log("this is getAllUsersUsers",res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllConvs = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/listconvs')
        // console.log("this is getAllUsersUsers",res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const UpdateUsersCollection = async (user) => {
    try {
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/listUsers/update', user)
        // console.log("this is UpdateUsersCollection",res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const generateRoomId = (otherUid) => {
    const thisUid = localStorage.getItem('uid');

    if (!thisUid || !otherUid) {
        throw new Error("User IDs are required to generate a room ID.");
    }

    // Sort the UIDs alphabetically
    const sortedUids = [thisUid, otherUid].sort();

    // Concatenate the sorted UIDs to form a roomId
    const roomId = sortedUids.join('-');

    return roomId;
}

export const enterNewRoom = async (roomId) => {
    socket.emit('join_private_chat', roomId)
}

export const leaveRoom = async (roomId) => {
    socket.emit('leave_private_chat', roomId)
}

export const fetchMessages = async (roomId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/messages?roomId=${roomId}`);
        // console.log("this is fetchMessages", res.data);
        return res.data; // Returning the fetched data
    } catch (error) {
        console.error("Error in fetchMessages: ", error);
        throw error; // Re-throwing the error to be caught in useEffect
    }
};