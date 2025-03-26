// src/app/pages/home/home.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  rol: number | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.rol = this.authService.getRol();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
