/**
 * Helper function that wraps a promise with a timeout.
 * @param promise - The promise to wrap.
 * @param ms - Timeout in milliseconds.
 * @param errorMessage - Error message if the timeout occurs.
 * @returns A promise that either resolves with the original promise’s value or rejects on timeout.
 */
export function withTimeout<T>(
	promise: Promise<T>,
	ms: number,
	errorMessage: string
): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(new Error(errorMessage));
		}, ms);

		promise
			.then((result) => {
				clearTimeout(timer);
				resolve(result);
			})
			.catch((err) => {
				clearTimeout(timer);
				reject(err);
			});
	});
}
