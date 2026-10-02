import { redisClient } from "../config/redis.js";

/**
 * Invalidates (deletes) all portfolio API caches.
 * Call this function whenever data is added, updated, or deleted.
 */
export const invalidateAllCaches = async () => {
    try {
        if (!redisClient.isOpen) {
            return;
        }

        // Find all keys starting with portfolio_cache:
        const keys = await redisClient.keys('portfolio_cache:*');

        if (keys.length > 0) {
            await redisClient.del(keys);
            console.log(`🧹 Cache cleared: ${keys.length} keys deleted.`);
        } else {
            console.log(`🧹 Cache cleared: No keys found to delete.`);
        }
    } catch (error) {
        console.error("Error invalidating cache:", error);
    }
};
