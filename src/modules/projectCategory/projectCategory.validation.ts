import { z } from "zod";

export const createCategoryValidationSchema = z.object({
    
    name: z.string().min(1, "Category name is required"),
})

export type TCreateCategory = z.infer<typeof createCategoryValidationSchema>

