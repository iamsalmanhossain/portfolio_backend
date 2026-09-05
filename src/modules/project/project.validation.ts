import { z } from "zod";

// Validation schema for creating a project entry
export const createProjectValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().optional(),
    thumbnail: z.string().optional(),
    githubUrl: z.string().url().optional().or(z.literal("")),
    liveUrl: z.string().url().optional().or(z.literal("")),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
    categoryId: z.string().optional(),
});

// Validation schema for updating project details
export const updateProjectValidationSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    thumbnail: z.string().optional(),
    githubUrl: z.string().url().optional().or(z.literal("")),
    liveUrl: z.string().url().optional().or(z.literal("")),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    categoryId: z.string().optional(),
});

export type TCreateProject = z.infer<typeof createProjectValidationSchema>
export type TUpdateProject = z.infer<typeof updateProjectValidationSchema>