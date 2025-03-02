import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ParkingComponent } from './app/parking/parking.component';

bootstrapApplication(ParkingComponent, {
  providers: [
    provideRouter([
      { path: '', component: ParkingComponent }
    ])
  ]
}).catch(err => console.error(err));
