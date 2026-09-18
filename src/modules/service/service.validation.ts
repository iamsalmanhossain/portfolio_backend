import { z } from "zod";

export const createServiceValidationSchema = z.object({
    body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    icon: z.string().optional(),
})
})

export const updateServiceValidationSchema = z.object({
    body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
})
})

export type TCreateService = z.infer<typeof createServiceValidationSchema>['body'];
export type TUpdateService = z.infer<typeof updateServiceValidationSchema>['body'];

