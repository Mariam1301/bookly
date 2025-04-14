import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';
import en from '../assets/i18n/en.json';
import ka from '../assets/i18n/ka.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, ka },
    translocoConfig: {
      availableLangs: ['en', 'ka'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
