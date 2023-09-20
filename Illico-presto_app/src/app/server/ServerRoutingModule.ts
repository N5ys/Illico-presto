import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TableListComponent} from "./components/table-list/table-list.component";
import {MenuComponent} from "./components/menu/menu.component";

const serverRoutes : Routes = [
  {path : 'tables', component: TableListComponent},
  {path : 'menu/:tableId', component : MenuComponent},
  {path : '', redirectTo : 'server/tables', pathMatch : "full"}
]
@NgModule({
  imports : [RouterModule.forChild(serverRoutes)],
  exports : [RouterModule],
})
export class ServerRoutingModule{}
