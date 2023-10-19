import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TableListComponent} from "./components/table-list/table-list.component";
import {MenuComponent} from "./components/menu/menu.component";
import {ServerGuard} from "../guards/server.guard";

const serverRoutes : Routes = [
  {path : 'tables', component: TableListComponent, canActivate:[ServerGuard]},
  {path : 'menu/:tableId', component : MenuComponent},
  {path : '**', redirectTo : 'tables'}

]
@NgModule({
  imports : [RouterModule.forChild(serverRoutes)],
  exports : [RouterModule],
})
export class ServerRoutingModule{}
