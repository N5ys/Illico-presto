import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminMenuComponent} from "./components/admin-menu/admin-menu.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {CategoryAddComponent} from "./components/category-add/category-add.component";
const adminRoutes : Routes = [
  {path : 'menu', component : AdminMenuComponent},
  {path : 'new-product', component: ProductAddComponent},
  {path : 'new-category', component: CategoryAddComponent}

]
@NgModule({
  imports : [RouterModule.forChild(adminRoutes)],
  exports : [RouterModule],
})
export class AdminRoutingModule{}