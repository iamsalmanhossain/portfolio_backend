import { z } from "zod";

export const createAdminPortfolioValidationSchema = z.object({
  body: z.object({
    templateName: z.string().min(2, { message: "Template name must be at least 2 characters long" }),
    isActive: z.boolean().optional(),
    personalData: z.any().optional(),
    websiteData: z.any().optional(),
  }),
});

export const updateAdminPortfolioValidationSchema = z.object({
  body: z.object({
    templateName: z.string().optional(),
    isActive: z.boolean().optional(),
    personalData: z.any().optional(),
    websiteData: z.any().optional(),
  }),
});

export const AdminPortfolioValidation = {
  createAdminPortfolioValidationSchema,
  updateAdminPortfolioValidationSchema,
};
