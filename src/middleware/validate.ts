import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";


export const validate = (schema: ZodSchema) =>
(req: Request, res: Response, next: NextFunction) => {
    console.log("validate: enter")
    const result = schema.safeParse(req.body);
    if(!result.success) {
        res.status(400);
        console.log("validate: exit with error")
        return;
    }
    req.body = result.data;
    next();
    console.log("validate: exit with sucesses")
};