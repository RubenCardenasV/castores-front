import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { authGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // opcional: redirige si está vacío
  { path: 'login', component: LoginComponent }, // ruta para login
  { path: 'home', component: HomeComponent,canActivate:[authGuard] },
  { path: 'inventario', loadChildren: () => import('./pages/inventario/inventario.module').then(m => m.InventarioModule),canActivate:[authGuard]  },
  { path: 'salida', loadChildren: () => import('./pages/salida/salida.module').then(m => m.SalidaModule),canActivate:[authGuard]  },
  { path: 'historial', loadChildren: () => import('./pages/historial/historial.module').then(m => m.HistorialModule),canActivate:[authGuard]  },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
