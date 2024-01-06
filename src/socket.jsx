import { io } from "socket.io-client";
const socket = new io.connect("http://localhost:3000");

export default socket;