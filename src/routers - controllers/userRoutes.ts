import express from "express";
import { body } from "express-validator";
import { getUser } from "../handlers/auth/getUserHandler";
import { getCurrentUser } from "../handlers/auth/getCurrentUserHandler";
import { login } from "../handlers/auth/loginHandler";
import { register } from "../handlers/auth/registerHandler";
import { confirmAuth } from "../middlewares/confirmAuthMiddleware";
import { handleInputErrors } from "../middlewares/validationErrorsMiddleware";
import {
	emailExists,
	isValidUserEmail,
} from "../utils/inputDataValidations/customInputValidations";

const userRouter = express.Router();

//if gets bigger - can also use validationSchemas for input field validation
userRouter.post(
	"/login",
	body("email")
		.exists()
		.withMessage("Email is required.")
		.bail()
		.custom(emailExists),
	body("password").exists().withMessage("Password is required."),
	handleInputErrors,
	login
);

userRouter.post(
	"/register",
	body("email").custom(isValidUserEmail).exists().bail().isEmail(),
	body("password").exists().withMessage("Field password is required"),
	handleInputErrors,
	register
);

userRouter.get("/user", confirmAuth, getCurrentUser);

userRouter.get("/user/:id", confirmAuth, getUser);

//if we want a specific error middleware for userRouter and overwrite the default one we write it here.
//if not error will be caught in the default one
/* userRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.log("inside use router eroror middleuse ");
	next();
}); */

export default userRouter;
