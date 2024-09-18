'use server'

import { db } from "@/lib/db";

export const createSubPrompt = async (subPrompt: string, UIId: string, parentSUBId: string, code: string, modelId: string) => {    
    if(subPrompt.startsWith("precise-") || subPrompt.startsWith("balanced-") || subPrompt.startsWith("creative-")) {     
           
        const codeData = await db.code.create({
            data: {
                code: code
            }
        });
        
        const data = await db.subPrompt.create({
            data: {
                UIId: UIId,
                subPrompt: subPrompt,
                SUBId: parentSUBId,
                codeId: codeData.id,
                modelId: modelId
            },
        });

        return {
            data,
            codeData
        };
    }

    const baseSubId = parentSUBId.split('-').slice(0, -1).join('-'); 
    const currentNumber = parseInt(parentSUBId.split('-').pop()!, 10);
    const nextSubIdBase = `${baseSubId}-${currentNumber + 1}`;

    const existingNextSub = await db.subPrompt.findFirst({
        where: {
            UIId: UIId,
            SUBId: nextSubIdBase
        }
    });

    let newSUBId: string;
    if (!existingNextSub) {
        newSUBId = nextSubIdBase;
    } else {
        const existingSubPrompts = await db.subPrompt.findMany({
            where: {
                UIId: UIId,
                SUBId: {
                    startsWith: `${nextSubIdBase}-`
                }
            },
            orderBy: {
                SUBId: 'desc'
            },
            take: 1
        });

        if (existingSubPrompts.length === 0) {
            newSUBId = `${nextSubIdBase}-1`;
        } else {
            const lastSUBId = existingSubPrompts[0].SUBId;
            const parts = lastSUBId.split('-');
            const lastNumber = parseInt(parts[parts.length - 1], 10);
            parts[parts.length - 1] = (lastNumber + 1).toString();
            newSUBId = parts.join('-');
        }
    }

    const codeData = await db.code.create({
        data: {
            code: code
        },
    });

    const data = await db.subPrompt.create({
        data: {
            UIId: UIId,
            subPrompt: subPrompt,
            SUBId: newSUBId,
            codeId: codeData.id,
            modelId: modelId
        },
    });

    return {
        data,
        codeData
    };
}
