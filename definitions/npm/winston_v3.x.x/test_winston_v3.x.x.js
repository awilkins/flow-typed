import winston from "winston";

winston.log({
  level: "info",
  message: "default logger info message"
});
winston.error("default logger error message");

let logger = winston.createLogger({
  format: winston.format.json(),
  level: "debug",
  exitOnError: false,
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      )
    })
  ]
});
logger.info("info message");
logger.error("error message");
logger.log({
  level: "debug",
  message: "debug message"
});

logger.clear();

const consoleTransport = new winston.transports.Console();
logger.add(consoleTransport);
logger.remove(consoleTransport);

logger.configure({
  level: "error"
});
logger.warn("warn message");

// $ExpectError
logger = winston.createLogger({
  format: winston.format.prettyPrint(),
  level: "foo",
  levels: {
    foo: 0,
    bar: 1,
    baz: 2
  },
  transports: [new winston.transports.Console()]
});
logger.foo("foo message");
logger.bar("bar message");
logger.info("info message");
