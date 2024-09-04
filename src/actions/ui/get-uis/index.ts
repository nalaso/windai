'use server'

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getUIs = async (mode:string, start:number, limit: number) => {
    let orderBy: Prisma.UIOrderByWithRelationInput | Prisma.UIOrderByWithRelationInput[] | undefined;

    switch (mode) {
        case 'latest':
            orderBy = { createdAt: 'desc' };
            break;
        case 'most_liked':
            orderBy = [
                { likesCount: 'desc' },  
                { createdAt: 'asc' }  
            ];
            break;
        case 'most_viewed':
            orderBy = [
                { viewCount: 'desc' },    
                { createdAt: 'asc' }  
            ];
            break;
        default:
            orderBy = { createdAt: 'desc' };
    }
    const uis = await db.uI.findMany({
        take: limit, 
        skip: start, 
        orderBy,
        include: {
            user: {
                select: {
                    username: true,
                    imageUrl: true,
                },
            },
        },
    });

    return uis;
}

export const getUI = async (UIId: string) => {
    const ui = await db.uI.findUnique({
        where: {
            id: UIId
        },
        include: {
            user: {
                select: {
                    username: true,
                    imageUrl: true,
                },
            },
            subPrompts: true
        },
    });
    return ui;
}

export const getUIHome = async () => {
    const uis = await db.uI.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: {
                    username: true,
                    imageUrl: true,
                },
            },
        },
    });
    return uis;
}