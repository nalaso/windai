import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { db } from "@/lib/db";
import { z } from "zod";
import { headers } from "next/headers";

const redis = Redis.fromEnv();

const inputSchema = z.object({
  uiid: z.string().min(1, "UIId is required"),
});

const getIp = () => {
  const forwardedFor = headers().get('x-forwarded-for');
  const realIp = headers().get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return'0.0.0.0';
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { uiid: UIId } = inputSchema.parse(body);

    const ip = getIp();
    
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
    const hash = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");    

    const isNew = await redis.set(["deduplicate", hash, UIId].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60 * 1000 * 3,
    });

    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }

    await redis.incr(["pageviews", "projects", UIId].join(":"));
    await db.uI.update({
      where: {
        id: UIId,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return new NextResponse(null, { status: 202 });
  } catch (error) {
    console.error('Error in view-increment API route:', error);
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ error: 'Invalid input', details: error.errors }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}