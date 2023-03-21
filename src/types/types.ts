export type SuccessApiResponse = {
	data: any;
	message?: string;
};

export type ErrorApiResponse = {
	error: string;
};

export enum EnumErrorTypes {
	NotFound,
	Auth,
	LibError,
	Validation,
}

export type UserJwtPayload = {
	id: string;
	email: string;
};
