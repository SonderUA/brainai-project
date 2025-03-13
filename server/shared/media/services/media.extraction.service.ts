import * as fsPromises from "fs/promises";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { logger } from "@/server/shared/logger";
import { OpenAIService } from "@/server/shared/services/open-ai.service";
import { MediaUtility } from "../utils/media.utility";
import { withTimeout } from "@/server/shared/utils/timeout";
import { execFile } from "child_process";
import { promisify } from "util";
import { extractErrorMessage } from "@/server/shared/utils/extractError";
import * as fs from "fs";

export class MediaExtractionService {
	constructor(private openAIService: OpenAIService) {}

	private readonly execFileAsync = promisify(execFile);

	/**
	 * Processes an image buffer using OpenAI to extract text from the image.
	 * @param buffer - The image buffer.
	 * @returns The recognized text from the image.
	 */
	async processImageFromBuffer(buffer: Buffer): Promise<string> {
		logger.info("Starting image processing");

		try {
			const base64Image = buffer.toString("base64");

			// Will use OpenAI's image-to-text service but could use Tesseract in the future.
			const text = await this.openAIService.extractTextFromImage(
				base64Image
			);
			return text;
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			throw new Error(`Image processing failed: ${errorMsg}`);
		}
	}

	/**
	 * Processes an audio buffer by transcribing its content.
	 * @param buffer - The audio buffer.
	 * @returns The transcribed text from the audio.
	 */
	async processAudioFromBuffer(buffer: Buffer): Promise<string> {
		logger.info("Starting audio transcription from buffer");
		const tempFilePath = MediaUtility.getTempFilePath("audio", ".wav");

		try {
			await fsPromises.writeFile(tempFilePath, buffer);

			// Will use OpenAI's transcription service but could use Vosk as an alternative.
			const response = await this.openAIService.transcribeAudio(
				tempFilePath
			);
			return response;
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error("Audio transcription error:", errorMsg);
			throw new Error(`Audio transcription failed: ${errorMsg}`);
		} finally {
			try {
				await fsPromises.unlink(tempFilePath);
			} catch (err) {
				logger.error(
					"Error deleting temporary file:",
					extractErrorMessage(err)
				);
			}
		}
	}

	/**
	 * Processes a video buffer by converting it into a stream and delegating processing.
	 * @param buffer - The video buffer.
	 * @returns The transcribed text from the video's audio track.
	 */
	async processVideoFromBuffer(buffer: Buffer): Promise<string> {
		const videoStream = Readable.from(buffer);
		return this.processVideoFromStream(videoStream);
	}

	/**
	 * Processes a video stream by extracting its audio and transcribing it.
	 * @param videoStream A readable video stream.
	 * @returns Transcribed text from the video's audio.
	 */
	async processVideoFromStream(videoStream: Readable): Promise<string> {
		const tempAudioPath = MediaUtility.getTempFilePath("audio", ".wav");
		const startTime = Date.now();
		const timeoutDuration =
			Number(process.env.VIDEO_PROCESSING_TIMEOUT) || 30000;

		try {
			await withTimeout(
				this.convertVideoToAudio(videoStream, tempAudioPath),
				timeoutDuration,
				"ffmpeg conversion timed out"
			);

			const audioBuffer = await fsPromises.readFile(tempAudioPath);
			const text = await this.processAudioFromBuffer(audioBuffer);
			logger.info("Video processing completed", {
				duration: Date.now() - startTime,
			});
			return text;
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error("Error processing video stream:", errorMsg);
			throw new Error(`Video processing failed: ${errorMsg}`);
		} finally {
			try {
				await fsPromises.rm(tempAudioPath, { force: true });
			} catch (err) {
				logger.error(
					"Error deleting temporary audio file:",
					extractErrorMessage(err)
				);
			}
		}
	}

	/**
	 * Processes a document buffer based on its extension.
	 * Supports PDF and plain text files.
	 * @param buffer - The document buffer.
	 * @param ext - The file extension (e.g., ".pdf" or ".txt").
	 * @returns The extracted text from the document.
	 */
	async processDocumentFromBuffer(
		buffer: Buffer,
		ext: string
	): Promise<string> {
		try {
			const lowerExt = ext.toLowerCase();
			if (lowerExt === ".pdf") {
				// TODO: Implement actual PDF parsing (e.g., using pdf-parse)
				const data = "some text, not actual pdf parsing";
				return data.trim();
			} else if (lowerExt === ".txt") {
				return buffer.toString("utf-8").trim();
			} else {
				const msg = `Unsupported document format: ${ext}`;
				logger.error(msg);
				throw new Error(msg);
			}
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error("Error processing document:", errorMsg);
			throw new Error(`Document processing failed: ${errorMsg}`);
		}
	}

	/**
	 * @private
	 * Converts a video file to an audio file using ffmpeg via execFileAsync.
	 * The video stream is first saved to a temporary file, then ffmpeg is invoked
	 * to extract the audio as a WAV file.
	 * @param videoInput - A readable stream containing video data.
	 * @param audioPath - Path where the output audio file will be saved.
	 * @returns A promise that resolves when conversion is complete.
	 */
	private async convertVideoToAudio(
		videoInput: Readable,
		audioPath: string
	): Promise<void> {
		const tempVideoPath = MediaUtility.getTempFilePath("video", ".mp4");
		try {
			await pipeline(videoInput, fs.createWriteStream(tempVideoPath));
			logger.info(`Temporary video file written: ${tempVideoPath}`);

			const commandArgs = [
				"-y",
				"-i",
				tempVideoPath,
				"-vn",
				"-acodec",
				"pcm_s16le",
				"-ar",
				"44100",
				"-ac",
				"2",
				audioPath,
			];
			logger.info(`Executing ffmpeg with args: ${commandArgs.join(" ")}`);
			await this.execFileAsync("ffmpeg", commandArgs);
			logger.info("FFmpeg successfully converted video to audio");
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error("FFmpeg conversion error:", errorMsg);
			throw new Error(`FFmpeg conversion failed: ${errorMsg}`);
		} finally {
			try {
				await fsPromises.unlink(tempVideoPath);
			} catch (err) {
				logger.error(
					"Error deleting temporary video file:",
					extractErrorMessage(err)
				);
			}
		}
	}
}
