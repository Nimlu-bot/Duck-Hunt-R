import { ErrorLogerSync } from './logger';

export const proccesErrorHandler = (): void => {
  process.on('uncaughtException', (error: Error, origin: string) => {
    const message = `Origin: ${origin}; Message: ${error.message}\n`;
    ErrorLogerSync(message);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: Error, promise: Promise<void>) => {
    ErrorLogerSync(
      `Unhandled Rejection at:, ${JSON.stringify(promise)}, reason:, ${
        reason.message
      } \n`,
    );
    process.exit(1);
  });
};
