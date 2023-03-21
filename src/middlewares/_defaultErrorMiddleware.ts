import { NextFunction, Request, Response } from "express";
import { ErrorApiResponse } from "../types/successErrorApiResponses";
import { EnumErrorTypes } from "../types/types";

export const defaultErrorMiddleware = (
	err: ErrorApiResponse,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(EnumErrorTypes[err.type]);

	switch (err.type) {
		case EnumErrorTypes.NotFound:
			return res.status(404).json({
				type: EnumErrorTypes[err.type],
				message: err.message ?? "Bad Request",
				errors: err.error,
			});
		case EnumErrorTypes.Auth:
			return res.status(401).json({
				type: EnumErrorTypes[err.type],
				message: err.message ?? "Unauthorized",
				errors: err.error,
			});
		case EnumErrorTypes.LibError:
			return res.status(500).json({
				type: EnumErrorTypes[err.type],
				message: err.message ?? "Something went wrong. Please try again later",
				errors: err.error,
			});
		case EnumErrorTypes.Validation:
			return res.status(400).json({
				type: EnumErrorTypes[err.type],
				message: err.message ?? "Invalid input",
				errors: err.error,
			});
		default:
			return res.status(500).json({
				type: EnumErrorTypes[err.type],
				message: err.message ?? "Server error. Please try again later.",
				errors: err.error,
			});
	}
};
