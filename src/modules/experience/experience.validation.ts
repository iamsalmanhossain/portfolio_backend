import { z } from "zod";

// Validation schema for creating a work experience entry
export const createExperienceValidationSchema = z.object({
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    startDate: z.coerce.date({ required_error: "Start Date is required" }),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().optional(),
});

// Validation schema for updating a work experience entry
export const updateExperienceValidationSchema = z.object({
    position: z.string().optional(),
    company: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().optional(),
    description: z.string().optional(),
});