import { z } from "zod";

// Validation schema for creating a technical skill entry
export const createSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    icon: z.string().optional(),
    level: z.number().min(0).max(100).default(80),
    category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "TOOL"]).default("FRONTEND"),
    showIn3d: z.boolean().default(true),
  }),
});

export const updateSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
    level: z.number().min(0).max(100).optional(),
    category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "TOOL"]).optional(),
    showIn3d: z.boolean().optional(),
  }),
});
