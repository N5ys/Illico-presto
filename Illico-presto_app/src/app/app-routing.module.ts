import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./auth/components/login/login.component";
import {GuestGuard} from "./guards/guest.guard";
import {ServerGuard} from "./guards/server.guard";
import {AdminGuard} from "./guards/admin.guard";
import {KitchenGuard} from "./guards/kitchen.guard";


const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'server', loadChildren: () => import('./server/server.module').then(m => m.ServerModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'kitchen', loadChildren: () => import('./kitchen/kitchen.module').then(m=>m.KitchenModule)},


];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
