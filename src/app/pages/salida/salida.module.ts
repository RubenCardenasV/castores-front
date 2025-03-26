import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalidaRoutingModule } from './salida-routing.module';
import { SalidaComponent } from './salida.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SalidaComponent
  ],
  imports: [
    CommonModule,
    SalidaRoutingModule,
    FormsModule 
  ]
})
export class SalidaModule { }
