import { signOut } from "next-auth/react";

export const signOutGithub = async () => {
    await signOut({ redirect: false });
}