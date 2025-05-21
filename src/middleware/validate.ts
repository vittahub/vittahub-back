import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";


export const validate = (schema: ZodSchema) =>
(req: Request, res: Response, next: NextFunction) => {
    console.log(req)
    const result = schema.safeParse(req.body);
    if(!result.success) {
        console.log("validate: exit with error", result.error);
        res.status(400).json({
            message: "validation failed",
            errors: result.error.errors
        });
        next()
        return;
    }
    req.body = result.data;
    next();
};