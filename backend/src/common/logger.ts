import { createLogger, format, transports } from 'winston';
import { appendFileSync } from 'fs';
import * as path from 'path';

const errorFile = path.join(__dirname, '../logs/error.log');
const infoFile = path.join(__dirname, '../logs/info.log');

const Logger = createLogger({
  format: format.combine(
    format.simple(),
    format.printf((info) => `${info.level}: ${info.message}`),
  ),

  exitOnError: false,

  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: infoFile,
      level: 'info',
      format: format.combine(format.json()),
    }),
    new transports.File({
      filename: errorFile,
      level: 'error',
      format: format.combine(format.json()),
    }),
  ],
});

const ErrorLoger = (error: Error, url: string, method: string): void => {
  Logger.error(`${method} - ${error.message} - ${url}`);
};

const ErrorLogerSync = (error: string): void => {
  Logger.error(error);
  appendFileSync(errorFile, error);
};

export { ErrorLoger, ErrorLogerSync, Logger };
