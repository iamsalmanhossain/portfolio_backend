import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { rateLimiters } from "../../middleware/rateLimiter.js";
import validateRequest from "../../middleware/validateRequest.js";
import isAuthenticated from "../../middleware/authenticate.js";
import {
    UserCreateSchema,
    EmailVerifySchema,
    UserLoginSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
} from "./auth.validation.js";

const router: Router = Router();

// Route 1: ইউজার রেজিস্ট্রেশন করবে এবং OTP ইমেইলে যাবে
router.post(
    "/register",
    rateLimiters.register,
    validateRequest(UserCreateSchema),
    AuthController.register
);

// Route 2: ইমেইলে পাওয়া OTP দিয়ে ইমেইল ভেরিফাই করবে
router.post(
    "/verify-email",
    rateLimiters.otp,
    validateRequest(EmailVerifySchema),
    AuthController.verifyEmail
);

// Route 3: লগইন করবে এবং tokens cookie-তে set হবে
router.post(
    "/login",
    rateLimiters.login,
    validateRequest(UserLoginSchema),
    AuthController.login
);

// Route 4: পাসওয়ার্ড ভুলে গেলে ইমেইলে OTP পাঠাবে
router.post(
    "/forgot-password",
    rateLimiters.forgotPassword,
    validateRequest(ForgotPasswordSchema),
    AuthController.forgotPassword
);

// Route 5: ফরগট পাসওয়ার্ডের OTP ভেরিফাই করবে, resetToken পাবে
router.post(
    "/verify-forgot-password-otp",
    rateLimiters.otp,
    validateRequest(EmailVerifySchema),
    AuthController.verifyForgotPasswordOTP
);

// Route 6: resetToken ব্যবহার করে নতুন পাসওয়ার্ড সেট করবে
router.post(
    "/reset-password/:resetToken",
    validateRequest(ResetPasswordSchema),
    AuthController.resetPassword
);

// Route 7: access token expire হলে refresh token দিয়ে নতুন token নেবে
router.post(
    "/refresh-token",
    rateLimiters.refreshToken,
    AuthController.refreshToken
);

// Extra Route: `isAuthenticated` middleware এর ব্যবহার দেখানোর জন্য একটি ডামি `/me` রাউট
router.get(
    "/me",
    isAuthenticated,
    AuthController.getMe
);
router.delete(
    "/logout",
    isAuthenticated,
    AuthController.logoutUser
);

export const AuthRoutes = router;
