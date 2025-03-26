import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // tu backend

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { correo: string, contrasena: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  getRol(): number | null {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      return JSON.parse(usuario).rol;
    }
    return null;
  }
  
  guardarUsuario(usuario: number){
    localStorage.setItem('usuario', JSON.stringify(usuario)); 
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
