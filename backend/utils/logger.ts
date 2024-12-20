import pino from "pino";

const log = pino({
	transport:
		process.env.NODE_ENV === "production"
			? {
				    target: "pino-pretty",
			  }
			: undefined,
	base: {
		pid: false,
	},
});

export default log;
