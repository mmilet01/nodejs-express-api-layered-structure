import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma/prismaDbClient";
import { createJWT, hashPasswords } from "../../utils/authHelperFunctions";
import {
	ErrorApiResponse,
	SuccessApiResponse,
} from "../../types/successErrorApiResponses";
import { EnumErrorTypes } from "../../types/types";

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;

		const hashedPassword = await hashPasswords(password);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		const token = createJWT(user);

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
		next(new ErrorApiResponse(err.message, EnumErrorTypes.LibError, err));
	}
};
