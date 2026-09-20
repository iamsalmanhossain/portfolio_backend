import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Express middleware to validate request payload against a Zod schema.
 */
const validateRequest = (schema: ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.safeParseAsync(req.body);

            if (!result.success) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: result.error.issues[0]?.message || "Invalid request data",
                    errors: result.error.issues,
                });
                return;
            }
            req.body = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validateRequest;
