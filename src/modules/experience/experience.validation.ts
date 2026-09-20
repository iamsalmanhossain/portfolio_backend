import { z } from "zod";

// Validation schema for creating a work experience entry
export const createExperienceValidationSchema = z.object({
    
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    startDate: z.preprocess((arg) => arg === "" ? undefined : arg, z.coerce.date({error: "Start Date is required"})),
    endDate: z.preprocess((arg) => arg === "" ? undefined : arg, z.coerce.date().optional()),
    isCurrent: z.boolean().default(false),
    description: z.string().optional(),
})



// Validation schema for updating a work experience entry
export const updateExperienceValidationSchema = z.object({
    
    position: z.string().optional(),
    company: z.string().optional(),
    startDate: z.preprocess((arg) => arg === "" ? undefined : arg, z.coerce.date().optional()),
    endDate: z.preprocess((arg) => arg === "" ? undefined : arg, z.coerce.date().optional()),
    isCurrent: z.boolean().optional(),
    description: z.string().optional(),
})

export type TCreateExperience = z.infer<typeof createExperienceValidationSchema>;
export type TUpdateExperience = z.infer<typeof updateExperienceValidationSchema>;
