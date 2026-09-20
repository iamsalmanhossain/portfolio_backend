import { z } from "zod";

export const createEducationValidationSchema = z.object({
    
    institute: z.string().min(1, "Institute name is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().optional(),
    image: z.string().optional(),
    startYear: z.number().min(1900, "Valid start year is required").max(new Date().getFullYear() + 10),
    endYear: z.number().optional(),
})

export const updateEducationValidationSchema = z.object({
    
    institute: z.string().optional(),
    degree: z.string().optional(),
    field: z.string().optional(),
    image: z.string().optional(),
    startYear: z.number().optional(),
    endYear: z.number().optional(),
})

export type TCreateEducation = z.infer<typeof createEducationValidationSchema>;
export type TUpdateEducation = z.infer<typeof updateEducationValidationSchema>;

