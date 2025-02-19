import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
	providers: [...appConfig.providers, provideRouter(routes, withComponentInputBinding()), provideHttpClient()]
}).catch((err) => console.error(err));
