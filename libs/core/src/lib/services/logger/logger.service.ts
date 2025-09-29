/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { LoggerService } from '@angular-ru/cdk/logger';

/**
 * Class decorator che aggiunge logging automatico all'entrata e uscita dei
 * metodi di una classe.
 *
 * Nota: il decorator non cambia il valore di ritorno originale. Se il metodo
 * ritorna una Promise, il decorator registra anche il tempo impiegato una
 * volta che la promise si risolve. Gli errori non vengono gestiti qui e la
 * responsabilità resta al chiamante.
 *
 * Uso:
 * ```ts
 * @Loggable()
 * class MyService { ... }
 * ```
 */
export function Loggable() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(
        target.prototype,
        propertyName,
      );

      if (!descriptor) {
        continue;
      }

      const originalMethod = descriptor.value;
      const isMethod = originalMethod instanceof Function;

      if (!isMethod) {
        // ignore properties che non sono metodi
        continue;
      }

      descriptor.value = function (...args: unknown[]) {
        const logPrefix = `[${target.name}][${propertyName}]`;
        const now = Date.now();

        // Manteniamo il valore di ritorno originale. Se è una promise,
        // gestiamo il logging al resolve senza alterare la promise stessa.
        const result = originalMethod.apply(this, args);
        console.log(`${logPrefix} start`);

        const exitLog = () => {
          console.log(`${logPrefix} stop in ${Date.now() - now} ms`);
        };

        // Workaround per supportare funzioni async (Promise-like)
        if (typeof result === 'object' && typeof (result as any).then === 'function') {
          const promise = (result as Promise<unknown>).then(exitLog);

          // Per evitare unUnhandledPromise rejection nel caso in cui la
          // promise venga rigettata e nessuno la catchi, aggiungiamo un
          // catch che esegue un noop. Non modifichiamo la promise
          // ritornata.
          if (typeof (promise as any).catch === 'function') {
            (promise as any).catch((e: unknown) => e);
          }
        } else {
          // Funzione sincrona: log immediato
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

  /** Log di livello generico */
  log(message: string, ...optionalParams: unknown[]) {
    this.loggerService.log(message, optionalParams);
  }

  /** Traccia una chiamata (più verboso di `log`) */
  trace(message: string, ...optionalParams: unknown[]) {
    this.loggerService.trace(message, optionalParams);
  }

  /** Avvisa (warning) */
  warn(message: string, ...optionalParams: unknown[]) {
    this.loggerService.warn(message, optionalParams);
  }

  /** Informazione di livello `info` */
  info(message: string, ...optionalParams: unknown[]) {
    this.loggerService.info(message, optionalParams);
  }

  /** Debug: dettagli di sviluppo */
  debug(message: string, ...optionalParams: unknown[]) {
    this.loggerService.debug(message, optionalParams);
  }

  /** Errore: invia un messaggio di errore al logger */
  error(message: string, ...optionalParams: unknown[]) {
    this.loggerService.error(message, optionalParams);
  }
}
