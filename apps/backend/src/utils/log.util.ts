import { EventEmitter2 } from '@nestjs/event-emitter';
import { SysLogLevel } from '@amen24/shared';

interface LogOptions {
  context: string;
  metadata?: Record<string, any>;
}

function emitLog(
  eventEmitter: EventEmitter2,
  level: SysLogLevel,
  message: string,
  stack?: string,
  options?: LogOptions,
) {
  eventEmitter.emit('sys-log', {
    level,
    message,
    stack,
    context: options?.context,
    metadata: options?.metadata,
  });
}

// Error-level log
export function logError(
  eventEmitter: EventEmitter2,
  error: unknown,
  options: LogOptions,
) {
  const isError = error instanceof Error;
  emitLog(
    eventEmitter,
    SysLogLevel.ERROR,
    isError ? error.message : String(error),
    isError ? error.stack : undefined,
    options,
  );
}

// Info-level log
export function logInfo(
  eventEmitter: EventEmitter2,
  message: string,
  options: LogOptions,
) {
  emitLog(eventEmitter, SysLogLevel.INFO, message, undefined, options);
}

// Warn-level log
export function logWarning(
  eventEmitter: EventEmitter2,
  message: string,
  options: LogOptions,
) {
  emitLog(eventEmitter, SysLogLevel.WARN, message, undefined, options);
}

// Debug-level log
export function logDebug(
  eventEmitter: EventEmitter2,
  message: string,
  options: LogOptions,
) {
  emitLog(eventEmitter, SysLogLevel.DEBUG, message, undefined, options);
}
