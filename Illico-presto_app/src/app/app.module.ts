import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ServerModule} from "./server/server.module";
import {CoreModule} from "./core/core.module";
import {AdminModule} from "./admin/admin.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {registerLocaleData} from "@angular/common";
import * as fr from '@angular/common/locales/fr';
import {TokenInterceptor} from "../Interceptor/tokenInterceptor.service";
import { SessionExpiredDialogComponent } from './dialog/session-expired-dialog/session-expired-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";





@NgModule({
  declarations: [
    AppComponent,
    SessionExpiredDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServerModule,
    CoreModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    MatDialogModule,
    MatButtonModule

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
