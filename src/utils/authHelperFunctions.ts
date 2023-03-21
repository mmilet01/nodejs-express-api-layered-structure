import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserJwtPayload } from "../types/types";

export const comparePasswords = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
};

export const hashPasswords = async (password: string) => {
	const salt = await bcrypt.genSalt();
	return bcrypt.hash(password, salt);
};

export const createJWT = (user: User) => {
	const jwtTokenPayload: UserJwtPayload = {
		id: user.id,
		email: user.email,
	};
	const token = jwt.sign(jwtTokenPayload, process.env.JWT_SECRET!, {
		expiresIn: 3600,
	});
	return token;
};

export const exclude = <User, Key extends keyof User>(
	user: User,
	keys: Key[]
): Omit<User, Key> => {
	for (let key of keys) {
		delete user[key];
	}
	return user;
};
