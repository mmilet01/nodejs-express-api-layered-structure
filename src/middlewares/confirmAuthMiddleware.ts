import { NextFunction, Request, Response } from "express";
import { ErrorApiResponse } from "../types/successErrorApiResponses";
import jwt from "jsonwebtoken";
import { EnumErrorTypes, UserJwtPayload } from "../types/types";

export const confirmAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		return next(new ErrorApiResponse("Invalid Token", EnumErrorTypes.Auth));
	}

	const [, token] = bearer.split(" ");

	if (!token) {
		return next(new ErrorApiResponse("Invalid Token", EnumErrorTypes.Auth));
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET!);
		req.user = user as UserJwtPayload;
		next();
	} catch (e: any) {
		next(new ErrorApiResponse(e.message, EnumErrorTypes.Auth, e));
	}
};
