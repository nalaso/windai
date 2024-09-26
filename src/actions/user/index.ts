'use server'

import { db } from "@/lib/db";

export const getUser = async (username: string) => {
    if (!username) return null;

    try {
        const user = await db.user.findUnique({
            where: {
                username
            },
            select: {
                id: true,
                name: true,
                username: true,
                imageUrl: true,
                createdAt: true,
            },
        });

        if (!user) return null;

        const uiCount = await db.uI.count({
            where: { 
                userId: user.id 
            },
        });

        const subPromptCount = await db.subPrompt.count({
            where: { 
                UI: { 
                    userId: user.id 
                } 
            },
        });


        return {
            ...user,
            uiCount,
            subPromptCount,
        };
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}