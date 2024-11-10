export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}

export class InputValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InputValidationError";
	}
}

export class DatabaseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DatabaseError";
	}
}
