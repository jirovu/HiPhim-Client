import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AdminGuardService } from './services/guard/admin-guard/admin-guard.service';
import { UserGuardService } from './services/guard/user-guard/user-guard.service';
import { PublicComponent } from './public/public.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { PrivateComponent } from './private/private.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'personal',
    children:
      [
        {
          path: 'admin',
          component: AdminComponent,
          canActivate: [AdminGuardService],
          data:
          {
            email: 'admin@hiphim.com'
          }
        },
        {
          path: 'user',
          component: UserComponent,
          canActivate: [UserGuardService],
          data:
          {
            email: 'admin@hiphim.com'
          }
        }
      ]
  },
  {
    path: 'watch',
    children:
      [
        {
          path: ':userId',
          component: PublicComponent
        }
      ]
  },
  {
    path: 'private',
    children:
      [
        {
          path: ':userId',
          component: PrivateComponent
        }
      ]
  },
  { path: 'movie-review', component: MovieReviewComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
