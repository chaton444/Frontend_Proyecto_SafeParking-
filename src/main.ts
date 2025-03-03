import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ParkingComponent } from './app/parking/parking.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(ParkingComponent, {
  providers: [ [provideHttpClient()],


    provideRouter([
      { path: '', component: ParkingComponent }
    ])
  ]
}).catch(err => console.error(err));
