import { createRateLimiter } from "../utils/createRateLimiter.js";

// Register: ১৫ মিনিটে max ৫ বার
const registerLimiter = createRateLimiter({
    prefix: "register",
    max: 5,
    windowMs: 15 * 60 * 1000,
    message: "Too many registration attempts. Please try again after 15 minutes.",
});

// Login: ১৫ মিনিটে max ৫ বার
const loginLimiter = createRateLimiter({
    prefix: "login",
    max: 15,
    windowMs: 15 * 60 * 1000,
    message: "Too many login attempts. Please try again after 15 minutes.",
});

// OTP (verify-email / verify-otp): ১০ মিনিটে max ৫ বার
const otpLimiter = createRateLimiter({
    prefix: "otp",
    max: 5,
    windowMs: 10 * 60 * 1000,
    message: "Too many OTP attempts. Please try again after 10 minutes.",
});

// Forgot password: ১৫ মিনিটে max ৩ বার
const forgotPasswordLimiter = createRateLimiter({
    prefix: "forgot-password",
    max: 3,
    windowMs: 15 * 60 * 1000,
    message: "Too many password reset requests. Please try again after 15 minutes.",
});

// Refresh token: ১৫ মিনিটে max ১০ বার
const refreshTokenLimiter = createRateLimiter({
    prefix: "refresh-token",
    max: 10,
    windowMs: 15 * 60 * 1000,
    message: "Too many token refresh attempts. Please try again after 15 minutes.",
});

export const rateLimiters = {
    register: registerLimiter,
    login: loginLimiter,
    otp: otpLimiter,
    forgotPassword: forgotPasswordLimiter,
    refreshToken: refreshTokenLimiter,
};