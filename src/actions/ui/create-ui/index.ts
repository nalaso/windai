'use server'

import { db } from "@/lib/db";

export const createUI = async (prompt: string, userId: string, img: string) => {
    const data = await db.uI.create({
        data: {
            userId: userId,
            prompt: prompt,
            img: img
        }
    });
    return data;
}
