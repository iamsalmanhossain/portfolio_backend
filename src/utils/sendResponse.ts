import { Response } from "express";

type TResponseData<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: T;
};

/**
 * Sends a standardized API response JSON structure.
 *
 * @param res - Express response object
 * @param payload - Standard status code, success status, message and response data
 */
const sendResponse = <T>(res: Response, payload: TResponseData<T>): void => {
    res.status(payload.statusCode).json({
        success: payload.success,
        message: payload.message || "Request completed successfully",
        meta: payload.meta,
        data: payload.data,
    });
};

export default sendResponse;