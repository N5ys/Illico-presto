import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {ServerGuard} from "./guards/server.guard";
import {AdminGuard} from "./guards/admin.guard";
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'kitchen', loadChildren: () => import('./kitchen/kitchen.module').then(m=>m.KitchenModule), canActivate:[AuthGuard]},
  { path: 'server', loadChildren: () => import('./server/server.module').then(m => m.ServerModule), canActivate:[ServerGuard]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[AdminGuard]},
  {path: '', redirectTo: 'kitchen/orders', pathMatch : "full"}


];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
