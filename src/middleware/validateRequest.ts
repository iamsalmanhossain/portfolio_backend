import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Express middleware to validate request payload against a Zod schema.
 */
const validateRequest = (schema: ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.safeParseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                cookies: req.cookies
            });

            if (!result.success) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: result.error.issues[0]?.message || "Invalid request data",
                    errors: result.error.issues,
                });
                return;
            }
            const data = result.data as any;
            if (data.body) req.body = data.body;
            if (data.query) req.query = data.query;
            if (data.params) req.params = data.params;
            if (data.cookies) req.cookies = data.cookies;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validateRequest;
