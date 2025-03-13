import { logger } from "@/server/shared/logger";
import { OpenAIService } from "@/server/shared/services/open-ai.service";
import { MediaInputService } from "./media.input.service";
import { MediaConverterService } from "./media.converter.service";
import { MediaExtractionService } from "./media.extraction.service";
import { extractErrorMessage } from "@/server/shared/utils/extractError";

export class MediaProcessingService {
	constructor(
		private mediaInputService: MediaInputService,
		private mediaConverterService: MediaConverterService,
		private mediaExtractionService: MediaExtractionService,
		private openAIService: OpenAIService
	) {}

	/**
	 * Processes a media input by reading, converting if necessary, and extracting text.
	 * Logs key steps and includes a correlation ID for easier traceability.
	 * @param input - A URL string or File object.
	 * @param source - Indicates if the input is from a "weblink" or "local".
	 * @param correlationId - A unique identifier for correlating logs.
	 * @returns A promise that resolves with the processed and boiled down text.
	 */
	async processMediaInput(
		input: string | File,
		source: "weblink" | "local",
		correlationId: string
	): Promise<string> {
		const overallStartTime = Date.now();

		try {
			const fileProcessingStart = Date.now();
			const { buffer, ext } = await this.mediaInputService.processInput(
				input,
				source
			);
			logger.info("File processing completed", {
				duration: Date.now() - fileProcessingStart,
				correlationId,
			});

			let processedBuffer = buffer;
			let lowerExt = ext.toLowerCase();

			if ([".jpg", ".png", ".bmp"].includes(lowerExt)) {
				if (lowerExt !== ".jpeg") {
					processedBuffer =
						await this.mediaConverterService.convertImageToJpeg(
							buffer,
							lowerExt
						);
					lowerExt = ".jpeg";
				}
			} else if ([".mp4", ".avi", ".mov", ".mkv"].includes(lowerExt)) {
				if (lowerExt !== ".mp4") {
					processedBuffer =
						await this.mediaConverterService.convertVideoToMp4(
							buffer,
							lowerExt
						);
					lowerExt = ".mp4";
				}
			} else if ([".mp3", ".flac"].includes(lowerExt)) {
				if (lowerExt !== ".wav") {
					processedBuffer =
						await this.mediaConverterService.convertAudioToWav(
							buffer,
							lowerExt
						);
					lowerExt = ".wav";
				}
			}

			logger.info(`Media conversion completed for type ${lowerExt}`, {
				correlationId,
			});

			let text: string;
			switch (lowerExt) {
				case ".jpeg":
					text =
						await this.mediaExtractionService.processImageFromBuffer(
							processedBuffer
						);
					break;
				case ".mp4":
					text =
						await this.mediaExtractionService.processVideoFromBuffer(
							processedBuffer
						);
					break;
				case ".wav":
					text =
						await this.mediaExtractionService.processAudioFromBuffer(
							processedBuffer
						);
					break;
				case ".pdf":
				case ".txt":
					text =
						await this.mediaExtractionService.processDocumentFromBuffer(
							processedBuffer,
							lowerExt
						);
					break;
				default:
					throw new Error(`Unsupported file type: ${lowerExt}`);
			}

			logger.info(`Media extraction completed for type ${lowerExt}`, {
				correlationId,
			});

			const boiledText = await this.openAIService.boilTextDown(text);
			logger.info("Text boiling completed", {
				correlationId,
				duration: Date.now() - overallStartTime,
			});
			return boiledText;
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error(`Media processing failed: ${errorMsg}`, {
				correlationId,
			});
			throw new Error(`Media processing failed: ${errorMsg}`);
		}
	}
}
