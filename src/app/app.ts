import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngIf, etc.
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Importamos CommonModule para directivas básicas
  templateUrl: './app.html', // Usamos el fichero HTML externo
  styleUrl: './app.scss'     // Usamos el fichero SCSS externo
})


export class AppComponent implements OnInit {
  title = 'mini-frontend';
  
  // Inyección de dependencias moderna
  private http = inject(HttpClient);
  
  // Variable para guardar los datos del backend
  backendData: any = null;
  errorMessage: string = '';

  ngOnInit() {
    this.fetchStatus();
  }

  fetchStatus() {
    this.errorMessage = '';
    this.backendData = null;

    // Hacemos la petición. El proxy redirige /api -> localhost:3000/api
    this.http.get('/api/health').subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos del Ground Segment:', data);
        this.backendData = data;
      },
      error: (error) => {
        console.error('❌ Error de conexión:', error);
        this.errorMessage = 'No se pudo conectar con el Backend C++. ¿Está encendido?';
      }
    });
  }
}