import { z } from "zod";

// FIXME: Implement zod validation for article input
export const createArticleSchema = z.object({
	title: z.string().min(3),
	content: z.string().email(),
	prompt: z.string().min(6),
	type: z.string().min(6),
});

// You could also export functions that wrap these validations
export function validateCreateArticle(data: any) {
	return createArticleSchema.parse(data);
}
