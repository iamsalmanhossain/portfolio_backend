import { z } from "zod";

export const createHeroValidationSchema = z.object({
    heroTitle: z.string().min(1, "Hero Title is required"),
    designations: z.array(z.string()).min(1, "At least one designation is required"),
    heroDescription: z.string().optional(),
    profileImage: z.string().optional(),
    resumeUrl: z.string().optional(),
    experienceYears: z.number().optional(),
    totalProjects: z.number().optional(),
    totalToolsAndTech: z.number().optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    isActive: z.boolean().default(true),
})

export const updateHeroValidationSchema = z.object({ 
    heroTitle: z.string().optional(),
    designations: z.array(z.string()).optional(),
    heroDescription: z.string().optional(),
    profileImage: z.string().optional(),
    resumeUrl: z.string().optional(),
    experienceYears: z.number().optional(),
    totalProjects: z.number().optional(),
    totalToolsAndTech: z.number().optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    isActive: z.boolean().optional(),
});

export type TCreateHero = z.infer<typeof createHeroValidationSchema>;
export type TUpdateHero = z.infer<typeof updateHeroValidationSchema>;
