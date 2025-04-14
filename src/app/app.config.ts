import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from './localization/transloco-loader.service';
import { provideTransloco } from '@jsverse/transloco';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { userReducer } from './store/user/user.reducer';
import { DialogService } from 'primeng/dynamicdialog';
import { UiDialogService } from './core/services/dialog/dialog.service';
import { providePrimeNG } from 'primeng/config';
import { Noir } from '../styles/primeng-presets';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'ka'],
        defaultLang: 'ka',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    ConfirmationService,
    MessageService,
    DialogService,
    UiDialogService,
    providePrimeNG({
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: '.dark',
          ripple: true,
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    provideStore({ user: userReducer }),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
