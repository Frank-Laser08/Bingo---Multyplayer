import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:3001");

export default function App() {
  const [message, setMessage] = useState("");
  const [received, setReceived] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => setReceived(msg));
    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Bingo Multiplayer</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
        className="border p-2 mr-2"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
      <p className="mt-4 text-green-600">Received: {received}</p>
    </div>
  );
}
