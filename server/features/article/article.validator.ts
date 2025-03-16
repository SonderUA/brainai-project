import { z } from "zod";

export const createArticleSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters long"),
	content: z.string().min(10, "Content must be at least 10 characters long"),
	prompt: z.string().min(6, "Prompt must be at least 6 characters long"),
	type: z.string().min(6, "Type must be at least 6 characters long"),
});

// Wrapper function to validate article data
export function validateCreateArticle(data: any) {
	return createArticleSchema.parse(data);
}
