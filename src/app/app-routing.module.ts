import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientMainLayoutComponent} from "./client/client-main-layout/client-main-layout.component";
import {RegistrationPageComponent} from "./client/registration-page/registration-page.component";
import {ClientListComponent} from "./client/client-list/client-list.component";
import {CreatePageComponent} from "./client/create-page/create-page.component";
import {EditPageComponent} from "./shared/edit-page/edit-page.component";
import {LoginPageComponent} from "./shared/login-page/login-page.component";
import {AdminListComponent} from "./admin/admin-list/admin-list.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {AdminGuard} from "./admin/admin-classes/admin.guard";
import {AdminEditPageComponent} from "./admin/admin-edit-page/admin-edit-page.component";

const routes: Routes = [
  {
    path:'',component: ClientMainLayoutComponent, children:[
      {path:'',redirectTo:'login',pathMatch:"full"},
      {path:'registration',component: RegistrationPageComponent,},
      {path:'login',component: LoginPageComponent},


    ]
  },
  {path:'client/list',component:ClientListComponent,canActivate:[AuthGuard]},
  {path:'client/list/new',component:CreatePageComponent,canActivate:[AuthGuard]},
  {path:'edit/:id',component:EditPageComponent,canActivate:[AuthGuard]},
  {path:'admin/list',component:AdminListComponent,canActivate:[AdminGuard]},
  {path:'admin/edit/:id',component:AdminEditPageComponent,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
