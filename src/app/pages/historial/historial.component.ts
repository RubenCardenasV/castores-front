import { Component } from '@angular/core';
import { MovimientoService } from 'src/app/services/movimiento.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {

  movimientos: any[] = [];
  tipoSeleccionado = '';

constructor(private movimientoService: MovimientoService) {}

ngOnInit() {
  this.movimientoService.obtenerTodos().subscribe(data => {
    this.movimientos = data;
  });
}

get movimientosFiltrados() {
  if (!this.tipoSeleccionado) return this.movimientos;
  return this.movimientos.filter(m => m.tipo?.nombre === this.tipoSeleccionado);
}



}
