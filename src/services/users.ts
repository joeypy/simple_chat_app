import { usersTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { TRegisterUser } from "@/types/user";

export const getUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .get();

  return user;
};

export const createUser = async (values: TRegisterUser) => {
  const user = await db.insert(usersTable).values(values).returning({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
  });

  return user[0];
};
