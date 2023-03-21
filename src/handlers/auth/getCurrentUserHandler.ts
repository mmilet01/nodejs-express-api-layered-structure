import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma/prismaDbClient";
import { SuccessApiResponse } from "../../types/successErrorApiResponses";
import { EnumErrorTypes } from "../../types/types";
import { exclude } from "../../utils/authHelperFunctions";

export const getCurrentUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.user!.id;

		const user = await prisma.user.findUnique({ where: { id } });

		const userWithoutPassword = exclude(user!, ["password"]);

		return res.json(new SuccessApiResponse(userWithoutPassword, 200));
	} catch (err: any) {
		const error = {
			type: EnumErrorTypes.LibError,
			msg: err.message,
		};
		next(error);
	}
};
