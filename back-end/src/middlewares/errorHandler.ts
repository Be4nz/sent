import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response, 
    next: NextFunction
    ) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: "Unauthorized access" });
    } else {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};