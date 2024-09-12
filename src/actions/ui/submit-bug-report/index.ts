'use server'

import { z } from "zod";
import { db } from "@/lib/db";

const bugReportSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z.string().min(1, "Description is required").max(500, "Description is too long"),
    reportType: z.string().max(100, "Title is too long"),
    severity: z.string().max(100, "Title is too long"),
    steps: z.string().max(500, "Title is too long").optional()
});

type BugReportInput = z.infer<typeof bugReportSchema>;

export async function submitBugReport(input: BugReportInput, userId: string | null) {
    try {        
        if (!userId) {
            return { success: false, error: "You must be logged in to submit a bug report." };
        }        

        const validatedInput = bugReportSchema.parse(input);        

        const bugReport = await db.bugReport.create({
            data: {
                title: validatedInput.title,
                description: validatedInput.description,
                reportType: validatedInput.reportType,
                severity: validatedInput.severity,
                steps: validatedInput.steps,
                userId: userId,
            },
        });        

        return { success: true, data: bugReport };
    } catch (error) {
        console.error("Error in submitBugReport:", error);
        throw error;
    }
}