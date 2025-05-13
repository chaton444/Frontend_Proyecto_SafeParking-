import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../servicios/HttpClient.car.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent {
  cars: any[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe(
      (data) => {
        this.cars = data;
      },
      (error) => {
        console.error('ERROR al cargar las imagenes', error);
      }
    );
  }

  editingPlate: number | null = null;
  tempPlate: string | null = null; // Variable temporal para el nombre de la imagen

  // Método para obtener el nombre de la imagen después del primer guion
  getImageName(filename: string): string {
    const parts = filename.split('-');
    return parts.length > 1 ? parts.slice(1).join('-') : filename;
  }

  // Inicia la edición del nombre de la imagen
startEditingPlate(car: any): void {
  this.editingPlate = car.id;
  this.tempPlate = car.plate; // Ya no uses getImageName(car.filename)
}

  // Actualiza el nombre de la imagen
  updatePlate(car: any): void {
    if (this.tempPlate?.trim()) {
      car.filename = this.tempPlate; // Actualiza el nombre de la imagen con el valor temporal
      // Aquí podrías hacer una petición para actualizar el nombre en la base de datos si lo deseas
    }
    this.editingPlate = null; // Finaliza la edición
  }

  // Cancela la edición
  cancelEdit(): void {
    this.tempPlate = null; // Restablece el nombre temporal
    this.editingPlate = null; // Cancela la edición
  }

  // Método para subir una imagen
  uploadImage(event: any, car: any): void {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.carService.uploadImage(formData).subscribe(response => {
      console.log('Imagen subida:', response);

      if (response && response.imageUrl) {
        car.image = response.imageUrl;
      }
    });
  }

  // Método para descargar la imagen
  downloadImage(imageUrl: string): void {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'car-image.jpg';
    link.click();
  }


  deleteImage(car: any): void {
    this.carService.deleteImage(car.id).subscribe(
      (response) => {
        console.log('Imagen eliminada:', response);
        this.loadCars(); // Recarga la lista de imágenes después de eliminar
      },
      (error) => {
        console.error('ERROR al eliminar la imagen', error);
      }
    );

  }

  // Método para actualizar la placa
 updateCarPlate(car: any): void {
  if (this.tempPlate?.trim()) {
    this.carService.updatePlate(car.id, this.tempPlate).subscribe(
      (response) => {
        console.log('Placa actualizada:', response);
        car.plate = this.tempPlate; // ACTUALIZA LA PLACA, NO EL FILENAME
        this.editingPlate = null;
      },
      (error) => {
        console.error('ERROR al actualizar la placa', error);
      }
    );
  }
}



}
