// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "testing", "production"])
      .default("development"),
    SESSION_AUTH: z.string().min(32),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // NEXT_PUBLIC_API_URL: z.string().min(1),
    // NEXT_PUBLIC_SOCKET_SERVER_URL: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SESSION_AUTH: process.env.SESSION_AUTH,
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // NEXT_PUBLIC_SOCKET_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL,
  },
});
