import { EnumErrorTypes } from "./types";

export class ErrorApiResponse {
	message: string;
	type: EnumErrorTypes;
	error: any;

	constructor(message: string, type: EnumErrorTypes, error?: any) {
		this.type = type;
		this.message = message;
		this.error = error;
	}
}

export class SuccessApiResponse {
	data: any;
	statusCode: number;

	constructor(data: any, statusCode: number) {
		this.data = data;
		this.statusCode = statusCode;
	}
}
