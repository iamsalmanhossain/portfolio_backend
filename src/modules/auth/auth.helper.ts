import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import { JwtPayload, RefreshTokenPayload } from "../../types/index.js";

/**
 * Creates a JWT access token valid for 30 minutes.
 */
export const createAccessToken = (payload: JwtPayload) => {
    return jwt.sign(payload, env.jwt_access_secret, { expiresIn: "30m" });
};

/**
 * Creates a JWT refresh token valid for 7 days.
 */
export const createRefreshToken = (payload: RefreshTokenPayload) => {
    return jwt.sign(payload, env.jwt_refresh_secret, { expiresIn: "7d" });
};

/**
 * Synchronously verifies a JWT access token.
 */
export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, env.jwt_access_secret) as JwtPayload;
};

/**
 * Synchronously verifies a JWT refresh token.
 */
export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, env.jwt_refresh_secret) as RefreshTokenPayload;
};

export const createTempLoginToken = (payload: { userId: string; email: string }) => {
    return jwt.sign(payload, env.jwt_temp_secret, { expiresIn: "15m" });
};

export const verifyTempLoginToken = (token: string) => {
    return jwt.verify(token, env.jwt_temp_secret) as { userId: string; email: string };
};

/**
 * Generates a unique secure UUID for tracking user sessions.
 */
export const generateSessionId = () => {
    return crypto.randomUUID();
};
