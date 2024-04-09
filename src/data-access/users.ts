import { users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function deleteUsers(userId: string) {
    await db.delete(users).where(eq(users.id, userId));
}