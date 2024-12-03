import { env } from "@/config/env.mjs";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({ connection: { url: env.DB_FILE_NAME } });
