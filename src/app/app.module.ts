import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { RegistrationPageComponent } from './client/registration-page/registration-page.component';
import { ClientMainLayoutComponent } from './client/client-main-layout/client-main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { TimeToNumberPipe } from './shared/pipes/TimeToString.pipe';
import { ListPageComponent } from './shared/list-page/list-page.component';
import { ClientListComponent } from './shared/list-page/client-list/client-list.component';
import { AdminListComponent } from './shared/list-page/admin-list/admin-list.component';
import { CreateEditFormComponent } from './shared/create-edit-form/create-edit-form.component';
import { EditClientPageComponent } from './shared/create-edit-form/edit-client-page/edit-client-page.component';
import { EditAdminPageComponent } from './shared/create-edit-form/edit-admin-page/edit-admin-page.component';
import { CreatePageComponent } from './shared/create-edit-form/create-page/create-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    ClientMainLayoutComponent,
    TimeToNumberPipe,
    ListPageComponent,
    ClientListComponent,
    AdminListComponent,
    CreateEditFormComponent,
    EditClientPageComponent,
    EditAdminPageComponent,
    CreatePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
