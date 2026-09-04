export interface RateLimiterOptions {
    windowMs ?: number
    max ?: number
    message ?: string
    prefix ?: string
}

export interface JwtPayload {
    userId: string;
    email: string;
}

export interface RefreshTokenPayload {
    userId: string;
    email: string;
    sessionId: string;
}

export interface GetMePayload {
    id: string;
    fullName: string
    email: string;
    role: string;
    status:string

}