'use server'

import { db } from "@/lib/db";

export const createSubPrompt = async (subPrompt:string, UIId: string, SUBId: string, code: string) => {
    const data = await db.subPrompt.create({
        data: {
            UIId: UIId,
            subPrompt: subPrompt,
            SUBId: SUBId
          },
    });
    const codeData = await db.code.create({
        data: {
            promptId: data.id,
            code: code
          },
    });
    return {
        data,
        codeData
    };
}
