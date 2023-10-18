const pino = require("pino");

/*
Defines a custom logger function that removes ANSI escape codes from Next.js dev server log messages
This config is picked up by the next-logger npm package.
*/

const logger = (defaultConfig) =>
  pino({
    ...defaultConfig,
    serializers: {
      msg: (msg) => {
        // Source: https://github.com/chalk/ansi-regex/blob/main/index.js#L3
        return msg.replace(
          /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
          ""
        );
      },
    },
  });

module.exports = {
  logger,
};
