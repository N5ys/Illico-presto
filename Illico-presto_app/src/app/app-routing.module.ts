import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./auth/components/login/login.component";


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'server', loadChildren: () => import('./server/server.module').then(m => m.ServerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'kitchen', loadChildren: () => import('./kitchen/kitchen.module').then(m=>m.KitchenModule)},
  { path: '**', redirectTo: 'server/tables', pathMatch: 'full' }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
