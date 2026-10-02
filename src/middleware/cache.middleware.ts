import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis.js";

/**
 * Middleware to cache GET requests for a specified duration.
 * @param duration Duration in seconds (default: 3 months = 90 * 24 * 60 * 60 = 7776000)
 */
export const cacheMiddleware = (duration: number = 7776000) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Only cache GET requests
        if (req.method !== "GET") {
            return next();
        }

        const key = `portfolio_cache:${req.originalUrl}`;

        try {
            const cachedData = await redisClient.get(key);

            if (cachedData) {
                // Return cached response
                res.status(200).json(JSON.parse(cachedData));
                return;
            }

            // If not in cache, capture the response to save it later
            const originalSend = res.json;
            res.json = function (body): any {
                // Only cache successful responses
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    redisClient.setEx(key, duration, JSON.stringify(body))
                        .catch(err => console.error("Redis Cache Error:", err));
                }
                return originalSend.call(this, body);
            };

            next();
        } catch (error) {
            console.error("Redis Cache Middleware Error:", error);
            next();
        }
    };
};

/**
 * Middleware to clear all portfolio caches after a mutation (POST, PUT, PATCH, DELETE).
 * Should be added AFTER the controller function in the route or used inside the controller.
 * Alternatively, can be added before the response is sent.
 */
export const clearCacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        res.on('finish', async () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                try {
                    const keys = await redisClient.keys('portfolio_cache:*');
                    if (keys.length > 0) {
                        await redisClient.del(keys);
                        console.log(`🧹 Cache cleared: ${keys.length} keys deleted due to ${req.method} on ${req.originalUrl}`);
                    }
                } catch (error) {
                    console.error("Error clearing cache:", error);
                }
            }
        });
    }
    next();
};
