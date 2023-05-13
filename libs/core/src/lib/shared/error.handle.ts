import { ErrorHandler, Injectable } from '@angular/core';
import { SioCoreAppComponentState } from '../components/app/store';

@Injectable()
export class SioCoreErrorHandlerService implements ErrorHandler {
  constructor(private sioCoreAppComponentState: SioCoreAppComponentState) {}

  public handleError(error: Error) {
    if (error.name === 'sio-error') {
      this.sioCoreAppComponentState.throwError(error.name, error.message);
    } else {
      console.error(`[Error] : ${error.name} - ${error.message}`);
    }
  }
}