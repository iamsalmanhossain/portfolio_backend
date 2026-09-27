import { z } from "zod";

// Validation schema for creating a technical skill entry
export const createSkillValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    icon: z.string().optional(),
    level: z.number().min(0).max(100).default(80),
    category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "TOOL", "TESTING", "CORE_ENGINEERING"]).default("FRONTEND"),
    showIn3d: z.boolean().default(true),
});

export const updateSkillValidationSchema = z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
    level: z.number().min(0).max(100).optional(),
    category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "TOOL", "TESTING", "CORE_ENGINEERING"]).optional(),
    showIn3d: z.boolean().optional(),
});

export type TCreateSkill = z.infer<typeof createSkillValidationSchema>;
export type TUpdateSkill = z.infer<typeof updateSkillValidationSchema>;
