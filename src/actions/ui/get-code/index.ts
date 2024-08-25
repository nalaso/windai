'use server'

import { db } from "@/lib/db";

export const getCodeFromPromptId = async (promptId: string) => {
    const code = await db.code.findUnique({
        where:{
            promptId: promptId
        }
    });
    return code?.code;
}