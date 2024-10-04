'use server'

import { db } from "@/lib/db";

export const deleteUI = async (uiid: string, userId: string) => {
    const ui = await db.uI.findUnique({
        where: {
            id: uiid,
        },
        select: {
            userId: true
        }
    });

    if (!ui) {
        throw new Error("UI not found");
    }

    if (ui.userId !== userId) {
        throw new Error("Unauthorized");
    }
    
    const data = await db.uI.delete({
        where: {
            id: uiid
        }
    });

    return data;
}
