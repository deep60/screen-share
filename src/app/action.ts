"use server";

import { deleteUsers } from "@/data-access/users";
import { getSession } from "@/lib/auth";

export async function deleteAccountAction() {
    const session = await getSession();

    if (!session) {
        throw new Error("You must be logged in to delete your account");
    }

    await deleteUsers(session.user.id)
}