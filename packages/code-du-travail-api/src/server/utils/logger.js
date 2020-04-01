const {
  createLogger,
  format,
  transports: { Console },
} = require("winston");

const logger = createLogger({
  level: "info",
  transports: [
    new Console({
      format: format.prettyPrint(),
    }),
  ],
});

exports.logger = logger;
