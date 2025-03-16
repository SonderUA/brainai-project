import { NextResponse } from "next/server";
import { validateCreateArticle } from "./article.validator";
import { MediaProcessingService } from "@/server/shared/media/services/media.processing.service";
import { OpenAIService } from "@/server/shared/services/open-ai.service";
import { createArticle } from "./article.service";
import { logger } from "@/server/shared/logger";
import { v4 as uuidv4 } from "uuid";
import { getUserById, updateUser } from "../user/user.service";
import { MediaInputService } from "@/server/shared/media/services/media.input.service";
import { MediaConverterService } from "@/server/shared/media/services/media.converter.service";
import { MediaExtractionService } from "@/server/shared/media/services/media.extraction.service";
import { extractErrorMessage } from "@/server/shared/utils/extractError";
import { ARTICLE_CREATION_COST } from "@/server/shared/constants";

export interface CreateArticleInput {
	userID: string;
	language: string;
	length: string;
	style: string;
	source: "weblink" | "local" | "prompt";
	input: string | File;
}

/**
 * Handles the creation of an article.
 *
 * @param {CreateArticleInput} inputData - The article creation input.
 * @returns {Promise<NextResponse>} A JSON response with the new article or an error message.
 */
export async function handleCreateArticle({
	userID,
	language,
	length,
	style,
	source,
	input,
}: CreateArticleInput): Promise<NextResponse> {
	const correlationId = uuidv4();
	const startTime = Date.now();

	// Instantiate services.
	const openAIService = new OpenAIService();
	const mediaProcessingService = new MediaProcessingService(
		new MediaInputService(),
		new MediaConverterService(),
		new MediaExtractionService(openAIService),
		openAIService
	);

	let prompt: string;

	try {
		logger.info("Starting article creation", {
			source,
			language,
			length,
			style,
			correlationId,
		});

		// Validate user.
		const user = await getUserById(userID);
		if (!user) {
			const msg = "User not found";
			logger.error(msg, { userID, correlationId });
			return NextResponse.json(
				{ error: msg, correlationId },
				{ status: 404 }
			);
		}

		if (user.tokens < 0) {
			const msg = "Insufficient amount of tokens";
			logger.error(msg, { userID, correlationId });
			return NextResponse.json(
				{ error: msg, correlationId },
				{ status: 403 }
			);
		}

		// Process input based on source type.
		if (source === "weblink" || source === "local") {
			prompt = await mediaProcessingService.processMediaInput(
				input,
				source,
				correlationId
			);
		} else if (source === "prompt") {
			logger.info("Processing prompt input", {
				prompt: input,
				correlationId,
			});
			prompt = await openAIService.boilTextDown(input as string);
		} else {
			const msg = "Invalid source type";
			logger.error(msg, { source, correlationId });
			return NextResponse.json(
				{ error: msg, correlationId },
				{ status: 400 }
			);
		}

		// Validate that prompt was successfully generated.
		if (!prompt || prompt.trim() === "") {
			const msg = "Unable to generate prompt from input";
			logger.error("Generated prompt is empty", {
				source,
				correlationId,
			});
			return NextResponse.json(
				{ error: msg, correlationId },
				{ status: 400 }
			);
		}

		// Generate the article using the provided parameters.
		const articleGenerationStart = Date.now();
		const content = await openAIService.generateArticle(
			prompt,
			language,
			length,
			style
		);
		const articleGenerationDuration = Date.now() - articleGenerationStart;
		logger.info("Article generation completed", {
			duration: articleGenerationDuration,
			correlationId,
		});

		if (!content || content.trim() === "") {
			logger.error("Generated content is empty", {
				prompt,
				correlationId,
			});
			return NextResponse.json(
				{ error: "Article generation failed", correlationId },
				{ status: 500 }
			);
		}

		// Derive article title from content.
		const title = content.slice(0, 50);
		const data = { title, content, prompt, type: "article" };
		const validData = validateCreateArticle(data);

		// Create the article.
		const newArticle = await createArticle(userID, validData);
		logger.info("Article created successfully", {
			articleId: newArticle.id,
			correlationId,
		});

		// Update user's tokens.
		const tokens = user.tokens - ARTICLE_CREATION_COST;
		await updateUser(userID, { tokens });
		logger.info("User tokens updated", { userID, tokens, correlationId });

		const totalDuration = Date.now() - startTime;
		logger.info("handleCreateArticle completed", {
			duration: totalDuration,
			correlationId,
		});

		return NextResponse.json(
			{ newArticle, correlationId, duration: totalDuration },
			{ status: 201 }
		);
	} catch (error: any) {
		const errorMsg = extractErrorMessage(error);
		logger.error("Error creating article", {
			error: errorMsg,
			correlationId,
		});
		return NextResponse.json(
			{ error: errorMsg || "Error creating article", correlationId },
			{ status: 500 }
		);
	}
}
