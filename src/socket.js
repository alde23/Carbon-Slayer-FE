import { io } from "socket.io-client";

// Connect to your backend's URL (adjust the URL if necessary)
const socket = io("http://localhost:3000");

export default socket;
