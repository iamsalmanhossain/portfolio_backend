import { z } from "zod";

// Validation schema for creating a project entry
export const createProjectValidationSchema = z.object({
    
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().nullish(),
        overviewTitle: z.string().nullish(),
    overviewDesc: z.string().nullish(),
    duration: z.string().nullish(),
    statusText: z.string().nullish(),
    projectScreenshots: z.array(z.object({
        imageUrl: z.string(),
        title: z.string().nullish(),
        description: z.string().nullish()
    })).nullish(),
    projectFeatures: z.array(z.object({
        icon: z.string().nullish(),
        title: z.string(),
        description: z.string().nullish()
    })).nullish(),
    thumbnails: z.array(z.string()).default([]),
    githubFrontendUrl: z.string().url().nullish().or(z.literal("")),
    githubBackendUrl: z.string().url().nullish().or(z.literal("")),
    videoUrl: z.string().url().nullish().or(z.literal("")),
    liveUrl: z.string().url().nullish().or(z.literal("")),
    technologies: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    role: z.string().nullish(),
    startDate: z.string().datetime().nullish().or(z.literal("")),
    endDate: z.string().datetime().nullish().or(z.literal("")),
    featured: z.boolean().default(false),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
    categoryId: z.string().nullish(),
    projectType: z.enum(['PERSONAL', 'CLIENT']).nullish(),
})

// Validation schema for updating project details
export const updateProjectValidationSchema = z.object({
    
    title: z.string().nullish(),
    description: z.string().nullish(),
    content: z.string().nullish(),
        overviewTitle: z.string().nullish(),
    overviewDesc: z.string().nullish(),
    duration: z.string().nullish(),
    statusText: z.string().nullish(),
    projectScreenshots: z.array(z.object({
        imageUrl: z.string(),
        title: z.string().nullish(),
        description: z.string().nullish()
    })).nullish(),
    projectFeatures: z.array(z.object({
        icon: z.string().nullish(),
        title: z.string(),
        description: z.string().nullish()
    })).nullish(),
    thumbnails: z.array(z.string()).nullish(),
    githubFrontendUrl: z.string().url().nullish().or(z.literal("")),
    githubBackendUrl: z.string().url().nullish().or(z.literal("")),
    videoUrl: z.string().url().nullish().or(z.literal("")),
    liveUrl: z.string().url().nullish().or(z.literal("")),
    technologies: z.array(z.string()).nullish(),
    tags: z.array(z.string()).nullish(),
    role: z.string().nullish(),
    startDate: z.string().datetime().nullish().or(z.literal("")),
    endDate: z.string().datetime().nullish().or(z.literal("")),
    featured: z.boolean().nullish(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).nullish(),
    categoryId: z.string().nullish(),
    projectType: z.enum(['PERSONAL', 'CLIENT']).nullish(),
})

export type TCreateProject = z.infer<typeof createProjectValidationSchema>
export type TUpdateProject = z.infer<typeof updateProjectValidationSchema>



