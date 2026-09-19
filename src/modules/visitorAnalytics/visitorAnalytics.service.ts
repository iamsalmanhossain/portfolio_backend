import { prisma } from "../../lib/prisma.js";

const trackVisitor = async (payload: { ipAddress?: string; userAgent?: string; page: string }) => {
    const result = await prisma.visitorAnalytics.create({
        data: {
            page: payload.page,
            ipAddress: payload.ipAddress,
            userAgent: payload.userAgent,
        }
    });

    return result;
};

export const VisitorAnalyticsService = {
    trackVisitor,
};
