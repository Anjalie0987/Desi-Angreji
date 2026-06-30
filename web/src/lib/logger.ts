export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext) {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && { context }),
    };
  }

  info(message: string, context?: LogContext) {
    console.info(JSON.stringify(this.formatMessage('info', message, context)));
  }

  warn(message: string, context?: LogContext) {
    console.warn(JSON.stringify(this.formatMessage('warn', message, context)));
  }

  error(message: string | Error, context?: LogContext) {
    const errorMsg = message instanceof Error ? message.message : message;
    const errorContext = message instanceof Error ? { stack: message.stack, ...context } : context;
    
    console.error(JSON.stringify(this.formatMessage('error', errorMsg, errorContext)));
    
    // Future: Add Sentry/LogRocket/OpenTelemetry reporting here
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(message);
    // }
  }

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(JSON.stringify(this.formatMessage('debug', message, context)));
    }
  }
}

export const logger = new Logger();
