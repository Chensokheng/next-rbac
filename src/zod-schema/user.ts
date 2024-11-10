import { z } from "zod";

export const createNewUserSchema = z.object({
	id: z.string().uuid(),
	createdAt: z.string().datetime({ offset: true }).optional(),
	displayName: z.string().optional(),
	email: z.string().email(),
	picture: z.string().optional(),
});

export const updateUserRoleSchema = z.object({
	id: z.string().uuid(),
	role: z.enum(["admin", "user", "guest"]),
});

export type TCreateNewUser = z.infer<typeof createNewUserSchema>;
export type TUpdateUserRole = z.infer<typeof updateUserRoleSchema>;
