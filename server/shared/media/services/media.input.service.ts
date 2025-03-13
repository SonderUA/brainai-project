import * as path from "path";
import { MediaUtility } from "../utils/media.utility";
import { logger } from "@/server/shared/logger";
import { withTimeout } from "@/server/shared/utils/timeout";
import { extractErrorMessage } from "@/server/shared/utils/extractError";

export class MediaInputService {
	private FETCH_TIMEOUT_MS = 10000;

	private CONTENT_TYPE_TO_EXT: { [key: string]: string } = {
		"image/jpeg": ".jpg",
		"image/png": ".png",
		"image/gif": ".gif",
		"audio/mpeg": ".mp3",
		"audio/wav": ".wav",
		"video/mp4": ".mp4",
	};

	/**
	 * Processes an input source by either downloading from a weblink or reading a local file.
	 * @param input - A URL string or a File object.
	 * @param source - The source type ("weblink" or "local").
	 * @returns An object containing the file buffer and its determined extension.
	 */
	async processInput(
		input: string | File,
		source: "weblink" | "local"
	): Promise<{ buffer: Buffer; ext: string }> {
		logger.info(`Processing input from source: ${source}`);
		let buffer: Buffer;
		let ext: string;

		if (source === "weblink") {
			if (typeof input !== "string" || !MediaUtility.isValidUrl(input)) {
				throw new Error("Invalid URL provided");
			}
			const { buffer: downloadedBuffer, ext: downloadedExt } =
				await this.downloadFile(input);
			buffer = downloadedBuffer;
			ext = downloadedExt;
		} else {
			if (!(input instanceof File)) {
				throw new Error("Invalid file provided");
			}
			try {
				const arrayBuffer = await input.arrayBuffer();
				buffer = Buffer.from(arrayBuffer);
			} catch (error) {
				const errorMsg = extractErrorMessage(error);
				logger.error("Error reading file array buffer:", errorMsg);
				throw new Error(`Failed to read file: ${errorMsg}`);
			}
			ext = MediaUtility.getFileExtension(input.name);
		}

		return { buffer, ext };
	}

	/**
	 * Downloads a file from the specified URL and returns its data as a Buffer along with the file extension.
	 *
	 * This function uses the Fetch API to retrieve the file. It determines the file extension by first checking the
	 * response's `Content-Type` header. If the header doesn't provide enough information, it falls back to extracting
	 * the extension from the URL's pathname.
	 *
	 * @param url - The URL from which to download the file.
	 * @returns A promise that resolves with an object containing:
	 *  - `buffer`: The downloaded file data as a Node.js Buffer.
	 *  - `ext`: The file extension determined from the content type or URL.
	 *
	 * @throws {Error} Throws an error if the fetch operation fails, the URL is invalid, or the request times out.
	 */
	private async downloadFile(
		url: string
	): Promise<{ buffer: Buffer; ext: string }> {
		logger.info(`Starting file download from URL: ${url}`);
		let parsedUrl: URL;
		try {
			parsedUrl = new URL(url);
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			logger.error(`Invalid URL provided: ${url}. Error: ${errorMsg}`);
			throw new Error(`Invalid URL: ${url}`);
		}

		const controller = new AbortController();
		let response: Response;

		try {
			response = await withTimeout(
				fetch(url, { signal: controller.signal }),
				this.FETCH_TIMEOUT_MS,
				`Fetch timed out for URL: ${url}`
			);
		} catch (error) {
			controller.abort();
			const errMsg = extractErrorMessage(error);
			logger.error(`Failed to fetch ${url}: ${errMsg}`);
			throw new Error(`Failed to fetch ${url}: ${errMsg}`);
		}

		if (!response.ok) {
			const msg = `Failed to fetch ${url}: ${response.status} ${response.statusText}`;
			logger.error(msg);
			throw new Error(msg);
		}

		let arrayBuffer: ArrayBuffer;
		try {
			arrayBuffer = await response.arrayBuffer();
		} catch (error) {
			const errMsg = extractErrorMessage(error);
			logger.error(
				`Error reading response array buffer for ${url}: ${errMsg}`
			);
			throw new Error(`Failed to read response from ${url}: ${errMsg}`);
		}

		const buffer = Buffer.from(arrayBuffer);
		const contentType = (
			response.headers.get("content-type") || ""
		).toLowerCase();

		const mappingEntry = Object.entries(this.CONTENT_TYPE_TO_EXT).find(
			([type]) => contentType.includes(type)
		);
		let ext = mappingEntry
			? mappingEntry[1]
			: path.extname(parsedUrl.pathname);

		if (!ext) {
			logger.warn(
				`Could not determine file extension for URL: ${url}. Defaulting to .bin`
			);
			ext = ".bin";
		}

		logger.info(
			`File download successful from ${url} with extension: ${ext}`
		);
		return { buffer, ext };
	}
}
