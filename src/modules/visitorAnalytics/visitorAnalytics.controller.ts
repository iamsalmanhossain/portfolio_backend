import { Request, Response } from "express";
import { VisitorAnalyticsService } from "./visitorAnalytics.service.js";

const trackVisitor = async (req: Request, res: Response) => {
    try {
        const { page } = req.body;
        
        if (!page) {
            return res.status(400).json({
                success: false,
                message: "Page is required",
            });
        }

        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];

        const result = await VisitorAnalyticsService.trackVisitor({
            page,
            ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
            userAgent,
        });

        res.status(200).json({
            success: true,
            message: "Visit tracked successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to track visit",
            error,
        });
    }
};

export const VisitorAnalyticsController = {
    trackVisitor,
};
