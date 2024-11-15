export class UnauthorizedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UnauthorizedError";
	}
}

export class ForbiddenError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ForbiddenError";
	}
}

export class ValidationParamsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationParamsError";
	}
}

export class DatabaseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DatabaseError";
	}
}
