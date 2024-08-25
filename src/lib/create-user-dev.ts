import { db } from "./db";

export const creatDevUser = async (username:string) => {
    await db.user.create({
        data: {
            userId: `user_${username}`,
            username: username,
            imageUrl: `https://github.com/${username}.png`,
            createdAt: new Date(),
        },
    });
}