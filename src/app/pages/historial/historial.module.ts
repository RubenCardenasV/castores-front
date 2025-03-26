import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './historial.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HistorialComponent
  ],
  imports: [
    CommonModule,
    HistorialRoutingModule,
    FormsModule
  ]
})
export class HistorialModule { }
