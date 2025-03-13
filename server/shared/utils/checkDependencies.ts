import { logger } from "@/server/shared/logger";
import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

interface Dependency {
	name: string;
	command: string;
}

/**
 * A list of external dependencies to check. Add additional dependencies as needed.
 */
const dependencies: Dependency[] = [
	{ name: "ffmpeg", command: "ffmpeg -version" },
	{ name: "winston", command: "winston -version" },
	{ name: "openai", command: "openai -version" },
	{ name: "zod", command: "zod -version" },
];

/**
 * Checks if all external dependencies are installed.
 *
 * This function runs a series of commands to verify that required external tools (e.g., ffmpeg,
 * ImageMagick) are available in the system's PATH. It logs the result for each dependency and
 * rejects if any of them are missing.
 *
 * @returns {Promise<void>} Resolves if all dependencies are available, otherwise rejects.
 * @throws {Error} Throws an error if one or more dependencies are not installed.
 */
export async function checkDependencies(): Promise<void> {
	try {
		await Promise.all(
			dependencies.map(async (dep) => {
				const { stdout } = await exec(dep.command);
				logger.info(`${dep.name} is available:`, stdout);
			})
		);
	} catch (error) {
		logger.error("One or more dependencies are missing:", error);
		throw new Error("Missing required external dependencies.");
	}
}
