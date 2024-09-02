import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi,withFetch } from '@angular/common/http';
import { routes } from './app/app-routing.module';
import { provideEnvironmentNgxMask } from 'ngx-mask';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(),withFetch()),
    provideEnvironmentNgxMask(),
  ],
}).catch(erro => console.error(erro));
