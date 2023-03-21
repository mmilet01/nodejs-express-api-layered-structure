import { NextFunction, Request, Response } from "express";

export const customParamMiddleware = (value: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		console.log("param", value);
		next();
	};
};
