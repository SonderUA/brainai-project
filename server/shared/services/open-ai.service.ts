import OpenAI from "openai";
import { logger } from "@/server/shared/logger";
import * as fs from "fs";
import { extractErrorMessage } from "@/server/shared/utils/extractError";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
	logger.error("OPENAI_API_KEY environment variable is missing or empty");
	throw new Error("OPENAI_API_KEY environment variable is missing or empty");
}

export const openai = new OpenAI({ apiKey });

export class OpenAIService {
	/**
	 * Extracts text from a base64 encoded image using OpenAI's API.
	 * @param base64Image - The base64 encoded image string.
	 * @returns The recognized text from the image.
	 */
	async extractTextFromImage(base64Image: string): Promise<string> {
		try {
			const response = await openai.chat.completions.create({
				model: process.env.OPENAI_MODEL || "gpt-4o",
				messages: [
					{
						role: "user",
						content: [
							{ type: "text", text: "What's in this image?" },
							{
								type: "image_url",
								image_url: {
									url: `data:image/jpeg;base64,${base64Image}`,
								},
							},
						],
					},
				],
				store: true,
			});

			const content = response.choices[0].message.content;
			if (!content) {
				throw new Error("No text found in image");
			}
			return content;
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error("Error extracting text from image", {
				error: errorMsg,
			});
			throw new Error(`Error extracting text from image: ${errorMsg}`);
		}
	}

	/**
	 * Transcribes an audio file using the OpenAI API.
	 * @param path - The file path to the audio data.
	 * @returns The transcribed text.
	 */
	async transcribeAudio(path: string): Promise<string> {
		try {
			const response = await openai.audio.transcriptions.create({
				file: fs.createReadStream(path),
				model: "whisper-1",
			});
			return response.text.trim();
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error("Transcription API error", { error: errorMsg });
			throw new Error(`Transcription API error: ${errorMsg}`);
		}
	}

	/**
	 * Summarizes the given text into a short, concise prompt.
	 *
	 * @param text - The text to be summarized.
	 * @returns The summarized prompt.
	 */
	async boilTextDown(text: string): Promise<string> {
		try {
			logger.info("Starting text summarization", {
				inputText: text.slice(0, 100),
			});

			const response = await openai.chat.completions.create({
				model: process.env.OPENAI_MODEL || "gpt-4o",
				messages: [
					{
						role: "developer",
						content: "You are a helpful assistant.",
					},
					{
						role: "user",
						content: `Summarize the following text into a short, concise prompt:\n\n${text}`,
					},
				],
				store: true,
			});

			logger.info("Received response from OpenAI for summarization", {
				responseSummary:
					response?.choices?.[0]?.message?.content?.slice(0, 100),
			});

			const summarizedContent = response?.choices?.[0]?.message?.content;
			if (summarizedContent) {
				const summarizedText = summarizedContent.trim();
				logger.info("Successfully summarized text", { summarizedText });
				return summarizedText;
			} else {
				logger.error(
					"Invalid response format received from OpenAI during summarization",
					{ response }
				);
				return "";
			}
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error("Error summarizing text", { error: errorMsg });
			return "";
		}
	}

	/**
	 * Generates an article based on the provided prompt.
	 *
	 * @param prompt - The prompt describing the article topic.
	 * @param language - The language of the article.
	 * @param length - The length of the article (e.g., "short", "medium", "long").
	 * @param style - The style of the article (e.g., "formal", "informal").
	 * @returns The generated article.
	 */
	async generateArticle(
		prompt: string,
		language: string,
		length: string,
		style: string
	): Promise<string> {
		try {
			logger.info("Starting article generation", {
				prompt: prompt.slice(0, 100),
			});

			const response = await openai.chat.completions.create({
				model: process.env.OPENAI_MODEL || "gpt-4o",
				messages: [
					{
						role: "developer",
						content:
							"You are a creative and knowledgeable content generator.",
					},
					{
						role: "user",
						content: `Generate a well-structured ${length} ${style} article in ${language} based on the following prompt:\n\n${prompt}`,
					},
				],
				store: true,
			});

			logger.info("Received article response from OpenAI", {
				responseSummary:
					response?.choices?.[0]?.message?.content?.slice(0, 100),
			});

			const articleContent = response?.choices?.[0]?.message?.content;
			if (articleContent) {
				const article = articleContent.trim();
				logger.info("Successfully generated article", {
					article: article.slice(0, 100),
				});
				return article;
			} else {
				logger.error(
					"Invalid response format received from OpenAI for article generation",
					{ response }
				);
				return "";
			}
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error("Error generating article", { error: errorMsg });
			return "";
		}
	}
}
