import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  correo = '';
  contrasena = '';
  errorMsg: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ correo: this.correo, contrasena: this.contrasena }).subscribe({
      next: (res) => {
        if (res.success) {
          this.authService.guardarToken(res.token);
          this.authService.guardarUsuario(res.usuario);
          this.router.navigate(['/home']); // o donde quieras redirigir
        } else {
          this.errorMsg = res.mensaje || 'Credenciales incorrectas';
        }
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.errorMsg = error.error?.mensaje || 'Error desconocido';
      }
    });
  }
}
