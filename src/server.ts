import { Server } from "node:http";
import app from "./app.js";
import env from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import connectRedis from "./config/redis.js";

const application = app();
let server: Server;

// Initialize connections outside the request handler for Vercel Serverless
const initConnections = async () => {
    try {
        await prisma.$connect();
        console.log("🟢 PostgreSQL database connection established successfully.");
        await connectRedis();
        console.log("🟢 Redis connection established successfully.");
    } catch (error) {
        console.error("❌ Failed to connect:", error);
    }
};

// Start server only if not in serverless environment (like Vercel)
// Vercel sets VERCEL=1 in its environment
if (process.env.VERCEL) {
    initConnections();
} else {
    const bootstrap = async () => {
        try {
            await prisma.$connect();
            console.log("🟢 PostgreSQL database connection established successfully.");
            await connectRedis();
            console.log("🟢 Redis connection established successfully.");
            
            server = application.listen(env.port, () => {
                console.log(`🚀 Server is listening on port ${env.port}`);
            });
        } catch (error) {
            console.error("❌ Failed to start server:", error);
            process.exit(1);
        }
    };

    bootstrap();

    process.on('unhandledRejection', (error) => {
        console.error('Unhandled rejection:', error);
        if (server) {
            server.close(async () => {
                await prisma.$disconnect();
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });

    process.on('SIGTERM', () => {
        if (server) {
            server.close(async () => {
                await prisma.$disconnect();
                process.exit(0);
            });
        } else {
            process.exit(0);
        }
    });

    process.on('SIGINT', () => {
        if (server) {
            server.close(async () => {
                await prisma.$disconnect();
                process.exit(0);
            });
        } else {
            process.exit(0);
        }
    });
}

// Export the app for Vercel's serverless environment
export default application;
