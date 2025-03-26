import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {
  rol:number | null=null;
  productos: any[] = [];
  productoSeleccionado: any = null;
  cantidad: number = 1;
  mensajeAlerta: string = '';

  constructor(private inventarioService: InventarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.rol = this.authService.getRol();
  }

  cargarProductos() {
    this.inventarioService.getActivos().subscribe(res => {
      this.productos = res;
    });
  }

  abrirModal(p: any) {
    this.productoSeleccionado = p;
    this.cantidad = 1;
    this.mensajeAlerta = '';
  }

  registrarSalida() {
    if (!this.productoSeleccionado || this.cantidad <= 0) {
      this.mensajeAlerta = 'Selecciona un producto y una cantidad válida';
      return;
    }

    if (this.cantidad > this.productoSeleccionado.cantidad) {
      this.mensajeAlerta = 'No puedes sacar más productos de los que hay en inventario';
      return;
    }

    this.inventarioService.disminuir(this.productoSeleccionado.idProducto, this.cantidad)
      .subscribe({
        next: () => {
          this.cargarProductos();
          const modal = document.getElementById('modalSalida');
          if (modal) bootstrap.Modal.getInstance(modal)?.hide();
        },
        error: (err) => {
          this.mensajeAlerta = err.error || 'Ocurrió un error al registrar la salida';
        }
      });
  }
}
