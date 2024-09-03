import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const eventSchema = z.object({
  type: z.literal('user.created'),
  data: z.object({
    id: z.string(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    const validatedEvent = eventSchema.parse(event);

    const userId = validatedEvent.data.id;

    const user = await clerkClient.users.getUser(userId);

    if (!user.username || !user.emailAddresses[0]?.emailAddress) {
      throw new Error('User data is incomplete');
    }

    await db.user.create({
      data: {
        userId: user.id,
        username: user.username,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'User stored' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}