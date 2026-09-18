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
            if (result.data.body) req.body = result.data.body;
            if (result.data.query) req.query = result.data.query;
            if (result.data.params) req.params = result.data.params;
            if (result.data.cookies) req.cookies = result.data.cookies;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validateRequest;
