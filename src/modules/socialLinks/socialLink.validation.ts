import { z } from "zod";

export const createSocialLinkValidationSchema = z.object({ 
    platform: z.string().min(1, "Platform name is required"),
    url: z.string().url("Valid URL is required"),
    iconUrl: z.string().url("Valid URL is required").optional(),
    heroSectionId: z.string().optional(),
    isActive: z.boolean().optional(),
});

export const updateSocialLinkValidationSchema = z.object({ 
    platform: z.string().optional(),
    url: z.string().url("Valid URL is required").optional(),
    iconUrl: z.string().url("Valid URL is required").optional(),
    heroSectionId: z.string().optional(),
    isActive: z.boolean().optional(),
});

export type TCreateSocialLink = z.infer<typeof createSocialLinkValidationSchema>;
export type TUpdateSocialLink = z.infer<typeof updateSocialLinkValidationSchema>;
