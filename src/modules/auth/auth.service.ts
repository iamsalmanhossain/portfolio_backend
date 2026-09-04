import { AppError } from "../../errors/AppError.js";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma.js";
import { hashPassword, verifyPassword } from "../../utils/hashPassword.js";
import { generateOTP, hashOTP, verifyOTP } from "../../utils/otp.js";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail.js";
import { OTPServices } from "../../services/otpServices.js";
import { redisClient } from "../../config/redis.js";
import {
    UserCreateType,
    UserLoginType,
    EmailVerifyType,
    ForgotPasswordType,
    ResetPasswordType,
} from "./auth.validation.js";
import { GetMePayload, JwtPayload } from "../../types/index.js";
import {
    createAccessToken,
    createRefreshToken,
    createTempLoginToken,
    generateSessionId,
    verifyRefreshToken,
    verifyTempLoginToken,
} from "./auth.helper.js";
import { UAParser, IResult } from "ua-parser-js";

// ─────────────────────────────────────────────
// Route 1: Register User
// ─────────────────────────────────────────────
const registerUser = async (payload: UserCreateType) => {
    const { email, password, fullName } = payload;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);

    const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, fullName },
        select: { id: true, email: true, fullName: true, isVerified: true },
    });

    try {
        await OTPServices.saveOTP("email_verification", newUser.id, hashedOTP);
        await sendVerificationEmail(newUser.email, newUser.fullName, otp);
    } catch {
        await prisma.user.delete({ where: { id: newUser.id } });
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send verification email");
    }

    return newUser;
};

// ─────────────────────────────────────────────
// Route 2: Verify Email
// ─────────────────────────────────────────────
const verifyEmail = async (payload: EmailVerifyType) => {
    const { email, otp } = payload;

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, fullName: true, isVerified: true },
    });

    if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
    }

    const otpRecord = await OTPServices.getOTP("email_verification", user.id);
    if (!otpRecord) {
        throw new AppError(StatusCodes.BAD_REQUEST, "OTP expired or not found");
    }

    const isOTPValid = await verifyOTP(otp, otpRecord);
    if (!isOTPValid) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid OTP");
    }

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
        select: { id: true, email: true, fullName: true, isVerified: true },
    });

    await OTPServices.deleteOTP("email_verification", user.id);

    return updatedUser;
};

// ─────────────────────────────────────────────
// Route 3: Login
// ─────────────────────────────────────────────
const loginUser = async (payload: UserLoginType, userAgent?: string, ip?: string) => {
    const { email, password } = payload;

    const parser = new UAParser(userAgent);
    const sessionInfo: IResult = parser.getResult();
    const deviceName = sessionInfo.os.name || "Unknown OS";
    const browserName = sessionInfo.browser.name || "Unknown Browser";

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, fullName: true, password: true, isVerified: true, status: true, isTwoFactorEnabled: true },
    });

    if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid email or password");
    }

    if (user.status === "DELETED") {
        throw new AppError(StatusCodes.BAD_REQUEST, "Your account has been deleted");
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid email or password");
    }

    if (!user.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please verify your email before logging in");
    }

    const jwtPayload: JwtPayload = { userId: user.id, email: user.email };
    const sessionId = generateSessionId();
    const accessToken = createAccessToken(jwtPayload);
    const refreshToken = createRefreshToken({ userId: user.id, email: user.email, sessionId });

    await prisma.session.create({
        data: {
            userId: user.id,
            sessionId,
            refreshToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            deviceInfo: `${deviceName} - ${browserName}`,
            ipAddress: ip,
        },
    });

    return { accessToken, refreshToken, user };
};

// ─────────────────────────────────────────────
// Route 4: Forgot Password
// ─────────────────────────────────────────────
const forgotPassword = async (payload: ForgotPasswordType) => {
    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
    }

    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);

    await OTPServices.saveOTP("password_reset", user.id, hashedOTP);
    await sendVerificationEmail(user.email, user.fullName, otp);

    return { message: "OTP sent to your email" };
};

// ─────────────────────────────────────────────
// Route 5: Verify Forgot Password OTP
// ─────────────────────────────────────────────
const verifyForgotPasswordOTP = async (payload: EmailVerifyType) => {
    const { email, otp } = payload;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
    }

    const otpRecord = await OTPServices.getOTP("password_reset", user.id);
    if (!otpRecord) {
        throw new AppError(StatusCodes.BAD_REQUEST, "OTP expired or not found");
    }

    const isOTPValid = await verifyOTP(otp, otpRecord);
    if (!isOTPValid) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid OTP");
    }

    const resetToken = crypto.randomUUID();
    await redisClient.set(`reset:${resetToken}`, user.id, { EX: 300 }); // 5 min
    await OTPServices.deleteOTP("password_reset", user.id);

    return { resetToken };
};

// ─────────────────────────────────────────────
// Route 6: Reset Password
// ─────────────────────────────────────────────
const resetPassword = async (resetToken: string, payload: ResetPasswordType) => {
    const userId = await redisClient.get(`reset:${resetToken}`);
    if (!userId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid or expired reset token");
    }

    const hashedPassword = await hashPassword(payload.newPassword);

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
        select: { id: true, email: true, fullName: true },
    });

    await redisClient.del(`reset:${resetToken}`);
    await prisma.session.deleteMany({ where: { userId } });

    return updatedUser;
};

// ─────────────────────────────────────────────
// Route 7: Refresh Token
// ─────────────────────────────────────────────
const refreshToken = async (token: string) => {
    const payload = verifyRefreshToken(token);
    if (!payload) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    }

    const newAccessToken = createAccessToken({ userId: payload.userId, email: payload.email });
    const newRefreshToken = createRefreshToken({ userId: payload.userId, email: payload.email, sessionId: payload.sessionId });

    await prisma.session.update({
        where: { refreshToken: token },
        data: { refreshToken: newRefreshToken, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) },
    });

    return { newAccessToken, newRefreshToken };
};

const logoutUser = async (token: string) => {
    const payload = verifyRefreshToken(token);
    if (!payload) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    }

    await prisma.session.deleteMany({ where: { userId: payload.userId } });
    return { message: "User logged out successfully" };
};
const getMe = async (user: JwtPayload) => {
    if (!user || !user.email) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "User not found or token invalid");
    }
    const userData = await prisma.user.findUnique({
        where: { email: user.email },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            status: true
        }
    });
    return userData;
};

export const AuthService = {
    registerUser,
    verifyEmail,
    loginUser,
    forgotPassword,
    verifyForgotPasswordOTP,
    resetPassword,
    refreshToken,
    logoutUser,
    getMe
};