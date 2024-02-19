import { Request, Response, NextFunction } from "express";

export const requestLogger = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
  };