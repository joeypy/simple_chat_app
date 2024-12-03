"use client";

import { io, Socket } from "socket.io-client";

// Inicializar cliente de Socket.IO
export const socket: Socket = io({
  path: "/socket.io", // Path predeterminado
});
