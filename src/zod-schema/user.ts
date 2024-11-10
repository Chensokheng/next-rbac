import { z } from "zod";

export const createNewUserSchema = z.object({
	id: z.string().uuid(),
	createdAt: z.string().datetime({ offset: true }).optional(),
	display_name: z.string().optional(),
	email: z.string().email(),
	picture: z.string().optional(),
});

export type TCreateNewUser = z.infer<typeof createNewUserSchema>;
