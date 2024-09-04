"use server"
import { db } from "@/lib/db";

export async function forkUI(uiId: string, userId: string) {
  try {
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const originalUI = await db.uI.findUnique({
      where: { id: uiId },
      include: {
        subPrompts: {
          include: {
            code: true
          }
        }
      }
    });

    if (!originalUI) {
      throw new Error("UI not found");
    }

    const forkedUI = await db.uI.create({
      data: {
        userId: userId,
        prompt: originalUI.prompt,
        img: originalUI.img,
        forkedFrom: originalUI.id,
        subPrompts: {
          create: originalUI.subPrompts.map(subPrompt => ({
            SUBId: subPrompt.SUBId,
            subPrompt: subPrompt.subPrompt,
            code: subPrompt.code ? {
              create: subPrompt.code.map(codeItem => ({
                code: codeItem.code
              }))
            } : undefined
          }))
        }
      },
      include: {
        subPrompts: {
          include: {
            code: true
          }
        }
      }
    });

    return forkedUI;
  } catch (error) {
    console.error("[FORK_UI]", error);
    throw error;
  }
}