"use server"
import { db } from "@/lib/db";

export async function forkUI(uiId: string, userId: string) {
	try {
		if (!userId) {
			throw new Error("Unauthorized");
		}

		const originalUI = await db.uI.findUnique({
			where: { 
				id: uiId 
			},
			include: {
				subPrompts: true
			}
		});
		
		if (!originalUI) {
			throw new Error("UI not found");
		}
		
		if(userId === originalUI.userId) {
			throw new Error("Cannot fork your own UI");
		}
		
		const forkedUI = await db.uI.create({
			data: {
				userId: userId,
				prompt: originalUI.prompt,
				img: originalUI.img,
				forkedFrom: originalUI.id,
				updatedAt: new Date(),
				uiType: originalUI.uiType,
				subPrompts: {
					create: originalUI.subPrompts.map(subPrompt => ({
						SUBId: subPrompt.SUBId,
						subPrompt: subPrompt.subPrompt,
						codeId: subPrompt.codeId
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

		if (!forkedUI) {
			throw new Error("Failed to fork UI");
		}

		return forkedUI;
	} catch (error) {
		console.error("[FORK_UI]", error);
		throw error;
	}
}
