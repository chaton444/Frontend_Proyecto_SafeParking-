import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component'; // 👈 este es el nuevo root
import { LoginComponent } from './app/login/login.component';
import { ParkingComponent } from './app/parking/parking.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: ParkingComponent },
    ]),
  ],
}).catch(err => console.error(err));
