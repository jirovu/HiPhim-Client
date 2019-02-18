import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { Movie } from './models/Movie';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin-page',
    component: AdminComponent,
    canActivate: [],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'user-page',
    component: UserComponent,
    canActivate: [],
    data: {
      role: 'user'
    }
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'admin-page', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
