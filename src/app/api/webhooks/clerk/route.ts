import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
    const event = await req.json();

        if (event.type === 'user.created') {
            const userId = event.data.id;

            try {
                const user = await clerkClient.users.getUser(userId);

                await db.user.create({
                    data: {
                        userId: user.id,
                        username: user.username!,
                        imageUrl: user.imageUrl,
                        createdAt: new Date(),
                    },
                });

                return NextResponse.json({ message: 'User stored' }, { status: 200 });
        } catch (error) {
            console.error('Error fetching or storing user:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Event not handled' }, { status: 400 });
    }
};