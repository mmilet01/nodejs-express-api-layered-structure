import { CustomValidator } from "express-validator";
import prisma from "../../../prisma/prismaDbClient";

export const isValidUserEmail: CustomValidator = (value) => {
	return prisma.user.findFirst({ where: { email: value } }).then((user) => {
		if (user) {
			return Promise.reject("E-mail already in use");
		}
	});
};

export const emailExists: CustomValidator = (value) => {
	return prisma.user.findFirst({ where: { email: value } }).then((user) => {
		if (!user) {
			return Promise.reject("Invalid credentials");
		}
	});
};
