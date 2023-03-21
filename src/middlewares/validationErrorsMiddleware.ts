import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorApiResponse } from "../types/successErrorApiResponses";
import { EnumErrorTypes } from "../types/types";

export const handleInputErrors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const result = validationResult(req);

	if (!result.isEmpty()) {
		const errors = result.array();
		next(
			new ErrorApiResponse("Invalid input", EnumErrorTypes.Validation, errors)
		);
	} else {
		next();
	}
};
