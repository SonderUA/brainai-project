import * as fsPromises from "fs/promises";
import { MediaUtility } from "../utils/media.utility";
import { execFile } from "child_process";
import { promisify } from "util";
import { logger } from "@/server/shared/logger";
import { extractErrorMessage } from "@/server/shared/utils/extractError";

export class MediaConverterService {
	private execFileAsync = promisify(execFile);
	/**
	 * Converts a media buffer using ffmpeg with provided arguments.
	 * @param buffer - The input media buffer.
	 * @param inputExt - The extension for the temporary input file.
	 * @param outputExt - The extension for the temporary output file.
	 * @param ffmpegArgs - Additional ffmpeg arguments.
	 * @returns A promise that resolves with the converted file's buffer.
	 */
	private async convertWithFfmpeg(
		buffer: Buffer,
		inputExt: string,
		outputExt: string,
		ffmpegArgs: string[]
	): Promise<Buffer> {
		const inputPath = MediaUtility.getTempFilePath("input", inputExt);
		const outputPath = MediaUtility.getTempFilePath("output", outputExt);
		try {
			logger.info(`Writing input file to temporary path: ${inputPath}`);
			await fsPromises.writeFile(inputPath, buffer);

			const commandArgs = [
				"-y",
				"-i",
				inputPath,
				...ffmpegArgs,
				outputPath,
			];
			logger.info(
				`Starting ffmpeg conversion: ffmpeg ${commandArgs.join(" ")}`
			);
			await this.execFileAsync("ffmpeg", commandArgs);

			logger.info(
				`ffmpeg conversion complete. Reading output file from: ${outputPath}`
			);
			return await fsPromises.readFile(outputPath);
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error(`FFmpeg conversion error: ${errorMsg}`);
			throw new Error(`FFmpeg conversion failed: ${errorMsg}`);
		} finally {
			await Promise.all([
				fsPromises
					.unlink(inputPath)
					.catch((err) =>
						logger.error(
							"Error deleting temporary input file:",
							extractErrorMessage(err)
						)
					),
				fsPromises
					.unlink(outputPath)
					.catch((err) =>
						logger.error(
							"Error deleting temporary output file:",
							extractErrorMessage(err)
						)
					),
			]);
		}
	}

	/**
	 * Converts an image buffer to JPEG format.
	 * @param buffer - The image buffer.
	 * @param inputExt - The original file extension.
	 * @returns A promise that resolves with the JPEG image buffer.
	 */
	async convertImageToJpeg(
		buffer: Buffer,
		inputExt: string
	): Promise<Buffer> {
		logger.info("Converting image to JPEG format");
		return this.convertWithFfmpeg(buffer, inputExt, ".jpeg", ["-q:v", "2"]);
	}

	/**
	 * Converts a video buffer to MP4 format.
	 * @param buffer - The video buffer.
	 * @param inputExt - The original file extension.
	 * @returns A promise that resolves with the MP4 video buffer.
	 */
	async convertVideoToMp4(buffer: Buffer, inputExt: string): Promise<Buffer> {
		logger.info("Converting video to MP4 format");
		return this.convertWithFfmpeg(buffer, inputExt, ".mp4", [
			"-c:v",
			"libx264",
			"-c:a",
			"aac",
		]);
	}

	/**
	 * Converts an audio buffer to WAV format.
	 * @param buffer - The audio buffer.
	 * @param inputExt - The original file extension.
	 * @returns A promise that resolves with the WAV audio buffer.
	 */
	async convertAudioToWav(buffer: Buffer, inputExt: string): Promise<Buffer> {
		logger.info("Converting audio to WAV format");
		return this.convertWithFfmpeg(buffer, inputExt, ".wav", []);
	}
}
