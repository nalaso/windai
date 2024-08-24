'use server'

import { db } from "@/lib/db";

export const createUI = async (prompt:string, username: string, img:string) => {
    const data = await db.uI.create({
        data: {
            userId: username,
            prompt: prompt,
            img: img,
            createdAt: new Date(),
            likes: 0,
            views: 1,
          },
    });
    return data;
}
