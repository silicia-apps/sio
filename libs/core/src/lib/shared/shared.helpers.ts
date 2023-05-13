import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Translation,
  TranslocoLoader,
  TRANSLOCO_LOADER,
} from '@ngneat/transloco';

const availableLangs = ['it', 'en'];

@Injectable({ providedIn: 'root' })
export class HttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export const httpLoader = {
  provide: TRANSLOCO_LOADER,
  useClass: HttpLoader,
};

export function InlineLoaderFactory(
  loader: (lang: string) => Promise<Translation>
) {
  try {
    return availableLangs.reduce((acc: Translation, lang: string) => {
      acc[lang] = () => loader(lang);
      return acc;
    }, {});
  } catch (e) {
    console.log('error');
  }
  return null;
}
