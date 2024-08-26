import { NextRequest, NextResponse } from "next/server";

import { Redis } from "@upstash/redis";
import { db } from "@/lib/db";

const redis = Redis.fromEnv();

export const config = {
    runtime: "edge",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();
    const UIId = body.uiid as string | undefined;
    if (!UIId) {
        return new NextResponse("UIId not found", { status: 400 });
    }

    const ip = req.ip;
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
    const hash = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");

    const isNew = await redis.set(["deduplicate", hash, UIId].join(":"), true, {
        nx: true,
        ex: 24 * 60 * 60,
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
            views: {
                increment: 1,
            },
        },
    })

    return new NextResponse(null, { status: 202 });
}