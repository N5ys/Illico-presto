import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminMenuComponent} from "./components/admin-menu/admin-menu.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {CategoryAddComponent} from "./components/category-add/category-add.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {AdminGuard} from "../guards/admin.guard";
import {RegisterComponent} from "./components/register/register.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
const adminRoutes : Routes = [

  {path : 'menu', component : AdminMenuComponent},
  {path : 'new-product', component: ProductAddComponent},
  {path : 'new-category', component: CategoryAddComponent},
  {path : 'settings', component : SettingsComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'users', component : UserListComponent},
  {path : 'users/:id', component : UserPageComponent},
  {path: '**', redirectTo: 'kitchen/orders' }

]
@NgModule({
  imports : [RouterModule.forChild(adminRoutes)],
  exports : [RouterModule],
})
export class AdminRoutingModule{}
