import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma/prismaDbClient";
import { comparePasswords, createJWT } from "../../utils/authHelperFunctions";
import {
	ErrorApiResponse,
	SuccessApiResponse,
} from "../../types/successErrorApiResponses";
import { EnumErrorTypes } from "../../types/types";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({ where: { email } });

		const isValid = await comparePasswords(password, user!.password);

		if (!isValid)
			return next(
				new ErrorApiResponse("Invalid credentials", EnumErrorTypes.Auth)
			);

		const token = createJWT(user!);

		return res.json(
			new SuccessApiResponse(
				{
					email: user!.email,
					token,
				},
				200
			)
		);
	} catch (err: any) {
		next(new ErrorApiResponse(err.message, EnumErrorTypes.LibError));
	}
};
