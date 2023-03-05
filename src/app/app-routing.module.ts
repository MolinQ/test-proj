import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMainLayoutComponent } from './client/client-main-layout/client-main-layout.component';
import { RegistrationPageComponent } from './client/registration-page/registration-page.component';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AdminGuard } from './admin/admin-classes/admin.guard';
import { ClientListComponent } from './shared/list-page/client-list/client-list.component';
import { AdminListComponent } from './shared/list-page/admin-list/admin-list.component';
import { CreatePageComponent } from './shared/create-edit-form/create-page/create-page.component';
import { EditClientPageComponent } from './shared/create-edit-form/edit-client-page/edit-client-page.component';
import { EditAdminPageComponent } from './shared/create-edit-form/edit-admin-page/edit-admin-page.component';

const routes: Routes = [
  {
    path:'', component: ClientMainLayoutComponent, children:[
      { path:'', redirectTo:'login', pathMatch:'full' },
      { path:'registration', component: RegistrationPageComponent },
      { path:'login', component: LoginPageComponent },


    ],
  },
  { path:'client/list', component:ClientListComponent, canActivate:[AuthGuard] },
  { path:'client/list/new', component:CreatePageComponent, canActivate:[AuthGuard] },
  { path:'clientEdit/:id', component:EditClientPageComponent, canActivate:[AuthGuard] },
  { path:'admin/list', component:AdminListComponent, canActivate:[AdminGuard] },
  { path:'adminEdit/:id', component:EditAdminPageComponent, canActivate:[AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
