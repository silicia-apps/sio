/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { LoggerService } from '@angular-ru/cdk/logger';

export function Loggable() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(
        target.prototype,
        propertyName
      );

      if (!descriptor) {
        continue;
      }

      const originalMethod = descriptor.value;
      const isMethod = originalMethod instanceof Function;

      if (!isMethod) {
        continue;
      }
      descriptor.value = function (...args: unknown[]) {
        const logPrefix = `[${target.name}][${propertyName}]`;
        const now = Date.now();
        const result = originalMethod.apply(this, args);
        console.log(`${logPrefix} start`);
        const exitLog = () => {
          console.log(`${logPrefix} stop in ${Date.now() - now} ms`);
        };

        // work around to support async functions.
        if (typeof result === 'object' && typeof result.then === 'function') {
          const promise = result.then(exitLog);

          // we defer responsibility to the caller of the method to handle the error.
          // but we need to catch the error otherwise we will get an unhandled error.
          // notice we return the original result not the promise with the logging call.
          if (typeof promise.catch === 'function') {
            promise.catch((e: unknown) => e);
          }
        } else {
          exitLog();
        }

        return result;
      };

      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
  };
}

@Injectable({ providedIn: 'root' })
export class SioCoreLoggerService {
  constructor(private loggerService: LoggerService) {}

  log(message: string, ...optionalParams: unknown[]) {
    this.loggerService.log(message, optionalParams);
  }

  trace(message: string, ...optionalParams: unknown[]) {
    this.loggerService.trace(message, optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]) {
    this.loggerService.warn(message, optionalParams);
  }

  info(message: string, ...optionalParams: unknown[]) {
    this.loggerService.info(message, optionalParams);
  }

  debug(message: string, ...optionalParams: unknown[]) {
    this.loggerService.debug(message, optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]) {
    this.loggerService.error(message, optionalParams);
  }
}
