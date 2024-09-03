'use server'

import { db } from "@/lib/db";
import { createSubPrompt } from "../create-subprompt";

export const updateSubPrompt = async (UIId: string, code: string, subid?: string) => {
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
        
        const codeData = await db.code.update({
            where: {
                promptId: existingSubPrompt.id
            },
            data: {
                code: code
            },
        });

        return { 
            data: existingSubPrompt,
            codeData
         };
    } catch (error) {
        console.error("Error updating subprompt:", error);
        return null;
    }
}