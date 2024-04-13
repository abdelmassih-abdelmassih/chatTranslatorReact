import { io } from "socket.io-client";
const socket = new io.connect("https://chattranslator-api.onrender.com");

export default socket;