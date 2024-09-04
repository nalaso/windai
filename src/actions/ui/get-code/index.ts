'use server'

import { db } from "@/lib/db";

export const getCodeFromId = async (codeId: string) => {
    const code = await db.code.findUnique({
        where:{
            id: codeId
        }
    });
    return code?.code;
}