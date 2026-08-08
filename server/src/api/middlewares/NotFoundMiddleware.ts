import type { Request, Response, NextFunction } from "express";
import { NotFoundException } from "../responses/index.js";

export class NotFoundMiddleware {
    handler = (_req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) return next();
        next(new NotFoundException());
    }
}