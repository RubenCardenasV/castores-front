import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service'; 
import { AuthService } from 'src/app/services/auth.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  productoSeleccionado: any = null;
  nuevoProducto = { nombre: '', descripcion: '' };
  cantidad:number = 0;
  mensajeAlerta: string = '';
  rol:number | null = null;

  constructor(
    private inventarioService: InventarioService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.rol = this.authService.getRol();
  }

  cargarProductos() {
    this.inventarioService.getTodos().subscribe((res) => this.productos = res);
  }

  agregarProducto() {
    if (!this.nuevoProducto.nombre?.trim() || !this.nuevoProducto.descripcion?.trim()) {
      this.mensajeAlerta = 'Nombre y descripción no pueden estar vacíos';
      setTimeout(() => this.mensajeAlerta = '', 3000);      
      return;
    }
    this.inventarioService.agregar(this.nuevoProducto).subscribe((res) => {
      this.cargarProductos();
      this.nuevoProducto = { nombre: '', descripcion: '' };
  
      const modalElement = document.getElementById('modalAgregar');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement) 
                          || new bootstrap.Modal(modalElement);
        modalInstance.hide();
      }
    });
  }

  darBaja(p: any) {
    this.inventarioService.darBaja(p.idProducto).subscribe(() => this.cargarProductos());
  }

  activar(p: any) {
    this.inventarioService.activar(p.idProducto).subscribe(() => this.cargarProductos());
  }

  abrirModal(producto: any) {
    this.productoSeleccionado = producto;
    this.cantidad = 1; 
  }

  aumentarInventario() {
    if (!this.productoSeleccionado || this.cantidad <= 0) {
      this.mensajeAlerta = 'Selecciona una cantidad válida';
      setTimeout(() => this.mensajeAlerta = '', 3000);      
      return;
    }
  
    this.inventarioService.aumentar(this.productoSeleccionado.idProducto, this.cantidad)
      .subscribe(() => {
        this.cargarProductos();
        this.cantidad = 0;
        this.productoSeleccionado = null;
        this.mensajeAlerta = '';
  
        const modal = document.getElementById('modalCantidad');
        if (modal) bootstrap.Modal.getInstance(modal)?.hide();
      });
  }
  
  
}
