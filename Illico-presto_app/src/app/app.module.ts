import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatGridListModule} from "@angular/material/grid-list";
import {ServerModule} from "./server/server.module";
import {CoreModule} from "./core/core.module";
import {AdminModule} from "./admin/admin.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {AdminGuard} from "./guards/admin.guard";
import {KitchenGuard} from "./guards/kitchen.guard";
import {ServerGuard} from "./guards/server.guard";
import {GuestGuard} from "./guards/guest.guard";
import {registerLocaleData} from "@angular/common";
import * as fr from '@angular/common/locales/fr';
import {TokenInterceptor} from "./auth/services/tokenInterceptor.service";





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    ServerModule,
    CoreModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'},

  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
