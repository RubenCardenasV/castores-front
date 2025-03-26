import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InventarioService {
  private api = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<any[]>(`${this.api}/todos`);
  }
  getActivos(){
    return this.http.get<any[]>(`${this.api}/activos`);
  }

  agregar(producto: any) {
    return this.http.post(this.api, producto);
  }

  darBaja(id: number) {
    return this.http.put(`${this.api}/baja/${id}`, {});
  }

  activar(id: number) {
    return this.http.put(`${this.api}/activar/${id}`, {});
  }

  aumentar(id: number, cantidad: number) {
    return this.http.put(`${this.api}/entrada/${id}?cantidad=${cantidad}`, {});
  }

  disminuir(id: number, cantidad: number){
    return this.http.put(`${this.api}/salida/${id}?cantidad=${cantidad}`, {});
  }
}
