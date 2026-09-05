import { z } from "zod";

// Validation schema for incoming contact message payloads
export const createContactValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
});