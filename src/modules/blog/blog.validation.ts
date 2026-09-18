import { z } from "zod";

export const createBlogValidationSchema = z.object({
    body: z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    summary: z.string().optional(),
    content: z.string().min(1, "Content is required"),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    isPublished: z.boolean().optional(),
    publishedAt: z.preprocess((arg) => arg === "" ? undefined : arg, z.coerce.date().optional()),
})
})

export const updateBlogValidationSchema = z.object({
    body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    summary: z.string().optional(),
    content: z.string().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
    viewCount: z.number().optional(),
    publishedAt: z.preprocess((arg) => arg === "" ? undefined : arg, z.coerce.date().optional()),
})
})

export type TCreateBlog = z.infer<typeof createBlogValidationSchema>['body'];
export type TUpdateBlog = z.infer<typeof updateBlogValidationSchema>['body'];

