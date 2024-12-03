"use client";

import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onReply(message: string) {
      setMessages((prev) => [...prev, message]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("reply", onReply);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("reply", onReply);
    };
  }, []);

  const sendMessage = () => {
    socket.emit("hello", "Hola desde el cliente");
    setMessages((prev) => [...prev, "Tú: Hola desde el cliente"]);
  };

  return (
    <div>
      <p>Status: {isConnected ? "Conectado" : "Desconectado"}</p>
      <button onClick={sendMessage}>Enviar mensaje</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
