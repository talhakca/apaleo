import {  APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {environment} from '../environments/environment';
import { featureKey, appReducer,AppEffects, UserState, InitAPP } from '@apaleo/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor} from '@apaleo/shared';
import { provideAnimations } from '@angular/platform-browser/animations';

export function initApplication(store: Store<{ users: UserState }>) {
  return () => new Promise(resolve => {
    store.dispatch(InitAPP());
    resolve(true);
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      [featureKey]: appReducer,
    }),
    provideEffects(
      AppEffects,
    ),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !!environment['production'], // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      // trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      // traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [Store]
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations()
  ],
};
