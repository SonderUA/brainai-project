import winston from "winston";

const logLevel = process.env.LOG_LEVEL || "info";

const transports: winston.transport[] = [new winston.transports.Console()];
if (process.env.NODE_ENV === "production") {
	transports.push(
		new winston.transports.File({ filename: "app.log", level: logLevel })
	);
}

/**
 * A Winston logger instance configured to log in JSON format with timestamps.
 * Use this logger throughout the application for consistent logging.
 */
export const logger = winston.createLogger({
	level: logLevel,
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports,
});
