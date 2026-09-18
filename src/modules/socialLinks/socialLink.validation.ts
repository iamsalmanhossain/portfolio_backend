import { z } from "zod";

export const createSocialLinkValidationSchema = z.object({ body: z.object({
    platform: z.string().min(1, "Platform name is required"),
    url: z.url("Valid URL is required"),
    iconUrl: z.url("Valid URL is required").optional(),
    heroSectionId: z.string().min(1, "Hero Section ID is required"),
    isActive: z.boolean().optional(),
})});

export const updateSocialLinkValidationSchema = z.object({ body: z.object({
    platform: z.string().optional(),
    url: z.url("Valid URL is required").optional(),
    iconUrl: z.url("Valid URL is required").optional(),
    heroSectionId: z.string().optional(),
    isActive: z.boolean().optional(),
})});

export type TCreateSocialLink = z.infer<typeof createSocialLinkValidationSchema>['body'];
export type TUpdateSocialLink = z.infer<typeof updateSocialLinkValidationSchema>['body'];


