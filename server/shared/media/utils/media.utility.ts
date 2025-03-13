import path from "path";
import os from "os";
import { randomUUID } from "crypto";

export class MediaUtility {
	/**
	 * Extracts the file extension from a given file name.
	 *
	 * @param fileName - The name of the file.
	 * @returns The file extension (including the dot), or an empty string if not found.
	 */
	static getFileExtension(fileName: string): string {
		const lastDotIndex = fileName.lastIndexOf(".");
		return lastDotIndex === -1 ? "" : fileName.substring(lastDotIndex);
	}

	/**
	 * Validates if a given string is a valid URL.
	 *
	 * @param url - The URL string to validate.
	 * @returns True if the URL is valid, false otherwise.
	 */
	static isValidUrl(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Generates a unique temporary file path.
	 *
	 * @param prefix - The prefix for the file name.
	 * @param ext - The file extension (including the dot, e.g. ".mp4").
	 * @returns A unique temporary file path.
	 */
	static getTempFilePath(prefix: string, ext: string): string {
		return path.join(
			os.tmpdir(),
			`${prefix}-${Date.now()}-${randomUUID()}${ext}`
		);
	}
}
