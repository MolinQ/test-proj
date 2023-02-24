import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminMainLayoutComponent } from './admin/admin-main-layout/admin-main-layout.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { EditPageComponent } from './shared/edit-page/edit-page.component';
import { RegistrationPageComponent } from './client/registration-page/registration-page.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { CreatePageComponent } from './client/create-page/create-page.component';
import { ClientMainLayoutComponent } from './client/client-main-layout/client-main-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {AdminEditPageComponent} from "./admin/admin-edit-page/admin-edit-page.component";
import {TimeToNumberPipe} from "./shared/pipes/TimeToString.pipe";

@NgModule({
  declarations: [
    AppComponent,
    AdminMainLayoutComponent,
    AdminListComponent,
    LoginPageComponent,
    EditPageComponent,
    RegistrationPageComponent,
    ClientListComponent,
    CreatePageComponent,
    ClientMainLayoutComponent,
    AdminEditPageComponent,
    TimeToNumberPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,

  ],
  providers:

    [
    {
    provide:HTTP_INTERCEPTORS,
    multi:true,
    useClass:TokenInterceptor}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
