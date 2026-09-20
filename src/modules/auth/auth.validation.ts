import { z } from "zod";

// Validation schema for creating a user account
export const UserCreateSchema = z.object({
    
    fullName: z.string().min(2, 'Full name must be at least 2 character'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long').max(16, 'Password must be less than 16 characters'),
    role: z.enum(['ADMIN', 'USER'], { error: 'Invalid user role' }).optional()
})

// Validation schema for authenticating a user
export const UserLoginSchema = z.object({

    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required')

})

// Validation schema for verifying user's email via OTP
export const EmailVerifySchema = z.object({

    email: z.email('Invalid email address'),
    otp: z.string().length(6, 'OTP must be 6 digits')

})

// Validation schema for requesting OTP resend
export const ResendOtpSchema = z.object({
 
    email: z.email('Invalid email address')

})

// Validation schema for starting password recovery
export const ForgotPasswordSchema = z.object({
   
    email: z.email('Invalid email address')
})


// Validation schema for finalizing password reset
export const ResetPasswordSchema = z.object({
   
    newPassword: z.string().min(6, 'Password must be at least 6 characters long').max(16, 'Password must be less than 16 characters'),
    confirmNewPassword: z.string().min(1, 'Confirm password is required')
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"]
})


export type UserCreateType = z.infer<typeof UserCreateSchema>
export type UserLoginType = z.infer<typeof UserLoginSchema>
export type EmailVerifyType = z.infer<typeof EmailVerifySchema>
export type ResendOtpType = z.infer<typeof ResendOtpSchema>
export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>
