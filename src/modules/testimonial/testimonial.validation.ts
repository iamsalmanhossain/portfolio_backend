import { z } from "zod";

export const createTestimonialValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    designation: z.string().optional(),
    company: z.string().optional(),
    image: z.string().optional(),
    review: z.string().min(1, "Review is required"),
    featured: z.boolean().optional(),
});

export const updateTestimonialValidationSchema = z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    company: z.string().optional(),
    image: z.string().optional(),
    review: z.string().optional(),
    featured: z.boolean().optional(),
});

export type TCreateTestimonial = z.infer<typeof createTestimonialValidationSchema>;
export type TUpdateTestimonial = z.infer<typeof updateTestimonialValidationSchema>;
