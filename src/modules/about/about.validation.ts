import { z } from "zod";

export const createAboutValidationSchema = z.object({ 
    name: z.string().min(1, "Name is required"),
    headline: z.string().min(1, "Headline is required"),
    shortBio: z.string().min(1, "Short bio is required"),
    description: z.string().min(1, "Description is required"),
    profileImage: z.string().optional(),
    resumeUrl: z.string().optional(),
    location: z.string().optional(),
    email: z.email().optional(),
    availability: z.boolean().default(true),
    experienceYears: z.number().default(0),
    projectsCount: z.number().default(0),
    clientsCount: z.number().default(0),
})

export const updateAboutValidationSchema = z.object({ 
    name: z.string().optional(),
    headline: z.string().optional(),
    shortBio: z.string().optional(),
    description: z.string().optional(),
    profileImage: z.string().optional(),
    resumeUrl: z.string().optional(),
    location: z.string().optional(),
    email: z.email().optional(),
    availability: z.boolean().optional(),
    experienceYears: z.number().optional(),
    projectsCount: z.number().optional(),
    clientsCount: z.number().optional(),
})

export type TCreateAbout = z.infer<typeof createAboutValidationSchema>
export type TUpdateAbout = z.infer<typeof updateAboutValidationSchema>
