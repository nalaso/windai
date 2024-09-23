'use server'

import { db } from "@/lib/db";

export const updateUI = async (UIId:string, payload: object) => {
    const data = await db.uI.update({
        where: {
            id: UIId 
        },
        data: {
            ...payload,
            updatedAt: new Date()
        },
    });
    return data;
}
