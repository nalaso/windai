'use server'

import { db } from "@/lib/db";

export const createUI = async (prompt: string, userId: string, uiType: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        throw new Error("User not found");
    }
    
    const data = await db.uI.create({
        data: {
            userId: userId,
            prompt: prompt,
            uiType: uiType,
            updatedAt: new Date(),
            img: ""
        }
    });
    return data;
}
