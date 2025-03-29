import { utilities } from 'nest-winston';
import { format, transports } from 'winston';
import * as winston from 'winston';

import type { LoggerInfo } from '@/types/logger';

const { combine, timestamp, align, printf } = format;

const loggerFormat = printf(
  ({ level, timestamp, message, stack }: LoggerInfo) => {
    const logLevel = level.charAt(0).toUpperCase() + level.slice(1);
    let template = `[${logLevel}] ${[timestamp]}: `;

    switch (level) {
      case 'error':
        template += `${stack!.map((msg: string) => {
          return msg?.replace('Error: ', '');
        })}\n`;
        break;
      case 'verbose':
        template += `\n${message}`;
        break;
      default:
        template += `${message}`;
    }

    return template;
  },
);

// Logger configuration
const loggerOptions = {
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  format: combine(
    timestamp({
      format: 'MM-DD HH:mm:ss.SSS',
    }),
    align(),
    loggerFormat,
  ),
};
const loggerTransports: any = [
  new transports.DailyRotateFile({
    level: 'warn',
    dirname: 'logs/error',
    filename: 'error-%DATE%.log',
    ...loggerOptions,
  }),
  new transports.DailyRotateFile({
    level: 'info',
    dirname: 'logs/info',
    filename: 'info-%DATE%.log',
    ...loggerOptions,
  }),
];

export function createLogger() {
  // If the CONSOLE_LOG is enabled, the log will be output to the console
  if (process.env.CONSOLE_LOG === 'true') {
    console.warn(
      '\x1b[31mDebug mode enabled, which may cause serious performance losses. Please disable it! \x1b[0m',
    );
    loggerTransports.push(
      new transports.Console({
        level: 'warn',
        format: combine(timestamp(), utilities.format.nestLike()),
      }),
    );
  }

  if (process.env.DEBUG_MODE === 'true') {
    loggerTransports.push(
      new transports.DailyRotateFile({
        level: 'debug',
        dirname: 'logs/debug',
        filename: 'debug-%DATE%.log',
        ...loggerOptions,
      }),
    );
  }

  return winston.createLogger({ transports: loggerTransports });
}
