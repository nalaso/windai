"use server"
import { signIn } from "@/auth"

export const signInGithub = async () => {
    await signIn("github")
}