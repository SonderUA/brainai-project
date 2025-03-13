/**
 * Extracts a meaningful error message from an unknown error.
 * @param error - The error object.
 * @returns A string representation of the error.
 */
export function extractErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}
