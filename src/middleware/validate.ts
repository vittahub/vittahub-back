import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";


export const validate = (schema: ZodSchema) =>
(req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if(!result.success) {
        res.status(400).json({
            message: "validation failed",
            errors: result.error.errors
        });
        return;
    }
    req.body = result.data;
    next();
};
