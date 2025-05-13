import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://18.116.90.219:3000/images'; // Asegúrate de que esta sea la URL correcta

  constructor(private http: HttpClient) {}

  // Método para subir una imagen
  uploadImage(formData: FormData): Observable<any> { 
    console.log('Subiendo imagen...');
    console.log('FormData:', formData);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // Método para obtener todas las imágenes
  getCars(): Observable<any[]> {
    console.log('Obteniendo lista de imágenes...');
    return this.http.get<any[]>(`${this.apiUrl}/uploads`);
  }

  // Método para obtener una imagen por ID
  getImage(id: number): Observable<Blob> {
    console.log(`Obteniendo imagen con ID: ${id}`);
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' });
  }

  deleteImage(id: number): Observable<any> {
    console.log(`Eliminando imagen con ID: ${id}`);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  updatePlate(id: number, plate: string): Observable<any> {
    console.log(`Actualizando placa de la imagen con ID: ${id}`);
    const body = { plate };
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  
}
