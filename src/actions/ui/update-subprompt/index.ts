'use server'

import { db } from "@/lib/db";

export const updateSubPrompt = async (UIId: string, code: string, modelId: string, subid?: string) => {
    try {
        const existingSubPrompt = await db.subPrompt.findFirst({
            where: {
                UIId: UIId,
                SUBId: subid
            }
        });

        if (!existingSubPrompt) {
            return null;
        }

        const codeData = await db.code.create({
            data: {
                code: code
            }
        });
        
        const data = await db.subPrompt.update({
            where: {
                id: existingSubPrompt.id
            },
            data: {
                codeId: codeData.id,
                modelId: modelId
            },
        });

        return { 
            data: data,
            codeData
         };
    } catch (error) {
        console.error("Error updating subprompt:", error);
        return null;
    }
}