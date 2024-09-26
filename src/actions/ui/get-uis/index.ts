'use server'

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getUIs = async (mode: string, start: number, limit: number, timeRange: string) => {
    let orderBy: Prisma.UIOrderByWithRelationInput | Prisma.UIOrderByWithRelationInput[] | undefined;
    let where: Prisma.UIWhereInput = {};

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

    const now = new Date();
    if(mode !== 'latest') {
        switch (timeRange) {
            case '1h':
                where.createdAt = { gte: new Date(now.getTime() - 60 * 60 * 1000) };
                break;
            case '24h':
                where.createdAt = { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) };
                break;
            case '7d':
                where.createdAt = { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
                break;
            case '30d':
                where.createdAt = { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
                break;
            case 'all':
            default:
                break;
        }
    }

    const uis = await db.uI.findMany({
        take: limit, 
        skip: start, 
        where,
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
        take: 11,
        orderBy: { updatedAt: 'desc' },
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

export const getUIProfile = async (userId: string, start: number, limit: number, mode: string) => {
    if(!userId) return [];

    if(mode === 'ownUI') {
        const uis = await db.uI.findMany({
            take: limit,
            skip: start,
            where: {
                userId
            },
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
    else if(mode === 'likedUI'){
        const likedUIs = await db.like.findMany({
            where: { 
                userId
            },
            skip: start,
            take: limit,
            select: { UIId: true },
        });

        const uiIds = likedUIs.map(like => like.UIId);

        const uis = await db.uI.findMany({
            where: { 
                id: { 
                    in: uiIds 
                } 
            },
            include: {
                user: {
                    select: {
                        username: true,
                        imageUrl: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return uis;
    }

    return [];
}