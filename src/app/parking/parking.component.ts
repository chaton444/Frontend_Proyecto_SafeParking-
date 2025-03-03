import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../servicios/HttpClient.car.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Agrega HttpClientModule aquí
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent {
  cars = [
    { 
      image: 'https://www.heraldo.mx/wp-content/uploads/2018/07/carro-chocolate-opt-696x470.jpg', 
      plate: 'ABC-1234' 
    },
    { 
      image: 'https://www.elsoldehermosillo.com.mx/local/x9zbeo-el-alcalde-buscara-prohibir-circulacion-de-autos-sin-placa/alternates/LANDSCAPE_400/El%20alcalde%20buscar%C3%A1%20prohibir%20circulaci%C3%B3n%20de%20autos%20sin%20placa', 
      plate: 'DEF-5678' 
    },
    { 
      image: 'https://www.elheraldodechihuahua.com.mx/incoming/b11gap-whatsapp-image-2020-05-23-at-2.02.50-pm.jpeg/ALTERNATES/LANDSCAPE_768/WhatsApp%20Image%202020-05-23%20at%202.02.50%20PM.jpeg', 
      plate: 'HBZ-441-C' 
    },
    { 
      image: 'https://practicatest.co/static/img/posts/co/historial-auto-placa-matricula.jpg', 
      plate: 'UAQ 629' 
    },
    { 
      image: 'https://www.elcarrocolombiano.com/wp-content/uploads/2021/09/20210015-Proyecto-Ley-Placas-Colombia-01-750x518.jpg', 
      plate: 'JNU 590' 
    },
    { 
      image: 'https://laopinion.com/wp-content/uploads/sites/3/2015/11/110315_2_personalized-plates.jpg?resize=480,270&quality=80', 
      plate: '7DAY727' 
    },
    { 
      image: 'https://www.mibolsillo.com/__export/1705015556275/sites/debate/img/2024/01/11/placas.png_1758632412.png', 
      plate: 'AOO-AAA' 
    },
    { 
      image: 'https://anteriorportal.erbol.com.bo/sites/default/files/styles/interior-hibridado/public/img_noticias/vehiuclo_defensa.jpg?itok=aRP0sJue', 
      plate: '510 MDA' 
    },
    { 
      image: 'https://adiariocr.com/wp-content/uploads/placa-de-carro-costa-rica.jpg', 
      plate: 'EEE-333' 
    },
    { 
      image: 'https://coahuila.elsiglo.mx/i/2015/12/665836.jpeg', 
      plate: 'JKL-3456' 
    }
  ];


  constructor(private carService: CarService) { }

  editingPlate: string | null = null;
  tempPlate: string | null = null; // Variable temporal para la placa


  startEditingPlate(car: any): void {
    this.editingPlate = car.plate; // Guarda la placa que se está editando
    this.tempPlate = car.plate; // Guarda la placa temporalmente
  }

  updatePlate(car: any): void {
    if (this.tempPlate?.trim()) {
      car.plate = this.tempPlate; // Actualiza la placa con el valor temporal
    }
    this.editingPlate = null; // Finaliza la edición
  }

  cancelEdit(): void {
    this.tempPlate = null; // Restablece la placa temporal
    this.editingPlate = null; // Cancela la edición
  }


  // Método para subir una imagen
  uploadImage(event: any, car: any): void {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    this.carService.uploadImage(formData).subscribe(response => {
      console.log('Imagen subida:', response);
      
      // Si la respuesta tiene la nueva URL de la imagen, actualiza el objeto en el array
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
}
