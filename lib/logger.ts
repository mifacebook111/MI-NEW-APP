type LogLevel = 'info' | 'warn' | 'error';

interface LogData {
  message: string;
  level: LogLevel;
  timestamp: string;
  [key: string]: unknown;
}

export function log(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>
) {
  const logData: LogData = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...data,
  };

  const logString = JSON.stringify(logData);

  switch (level) {
    case 'error':
      console.error(logString);
      break;
    case 'warn':
      console.warn(logString);
      break;
    default:
      console.log(logString);
  }
}

export const logger = {
  info: (message: string, data?: Record<string, unknown>) =>
    log('info', message, data),
  warn: (message: string, data?: Record<string, unknown>) =>
    log('warn', message, data),
  error: (message: string, data?: Record<string, unknown>) =>
    log('error', message, data),
};
