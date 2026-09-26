import { z } from "zod";

export const createSeoSettingValidationSchema = z.object({
    
    siteName: z.string().optional(),
    metaTitle: z.string().min(1, "Meta title is required"),
    metaDescription: z.string().min(1, "Meta description is required"),
    metaKeywords: z.array(z.string()).optional().default([]),
    author: z.string().optional(),
    favicon: z.string().url("Valid URL is required").optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().url("Valid URL is required").optional(),
    twitterCard: z.string().optional().default("summary_large_image"),
    fontFamily: z.string().optional().default("Inter"),
})

export const updateSeoSettingValidationSchema = z.object({
    
    siteName: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    author: z.string().optional(),
    favicon: z.string().url("Valid URL is required").optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().url("Valid URL is required").optional(),
    twitterCard: z.string().optional(),
    fontFamily: z.string().optional(),
})

export type TCreateSeoSetting = z.infer<typeof createSeoSettingValidationSchema>;
export type TUpdateSeoSetting = z.infer<typeof updateSeoSettingValidationSchema>;

