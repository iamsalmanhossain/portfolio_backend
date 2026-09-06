import { z } from "zod";

export const createCertificateValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    issuer: z.string().min(1, "Issuer is required"),
    credentialUrl: z.string().url("Valid URL is required").optional(),
    image: z.string().url("Valid URL is required").optional(),
    issueDate: z.preprocess((arg) => arg === "" ? undefined : arg, z.coerce.date().optional()),
});

export const updateCertificateValidationSchema = z.object({
    title: z.string().optional(),
    issuer: z.string().optional(),
    credentialUrl: z.string().url("Valid URL is required").optional(),
    image: z.string().url("Valid URL is required").optional(),
    issueDate: z.preprocess((arg) => arg === "" ? undefined : arg, z.coerce.date().optional()),
});

export type TCreateCertificate = z.infer<typeof createCertificateValidationSchema>;
export type TUpdateCertificate = z.infer<typeof updateCertificateValidationSchema>;
