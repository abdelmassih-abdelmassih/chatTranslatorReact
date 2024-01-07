import axios from 'axios'

export const getAllUsers = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/listusers')
        console.log("this is getAllUsersUsers",res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }

}