'use server'

import { db } from "@/lib/db";

export const toggleLike = async (userId: string, UIId: string) => {    
    const existingLike = await db.like.findFirst({
        where: { userId, UIId }
    });

    if (existingLike) {
        await db.like.delete({ 
            where: { 
                id: existingLike.id 
            }
        });
        await db.uI.update({
            where: {
                id: UIId 
            },
            data: { 
                likeCount: { 
                    decrement: 1 
                }
            }
        });
        return { liked: false }
    } else {
        await db.like.create({
            data: { 
                userId, 
                UIId 
            }
        });
        await db.uI.update({
            where: { 
                id: UIId 
            },
            data: { 
                likeCount: { 
                    increment: 1 
                } 
            }
        });
        return { liked: true }
    }
}
