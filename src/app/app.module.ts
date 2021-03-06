import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatBottomSheetModule,
  MatDialogModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { CookieService } from 'ngx-cookie-service';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PublicComponent } from './public/public.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatSelectModule } from '@angular/material/select';
import { HeraComponent } from './hera/hera.component';
import { UploadBottomSheetComponent } from './upload-bottom-sheet/upload-bottom-sheet.component';
import { PrivateComponent } from './private/private.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    ForgotPasswordComponent,
    AdminComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PublicComponent,
    MovieReviewComponent,
    HeraComponent,
    UploadBottomSheetComponent,
    PrivateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatListModule,
    MatGridListModule,
    AngularFontAwesomeModule,
    MatSelectModule,
    NgxPaginationModule,
    MatBottomSheetModule,
    MatDialogModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  entryComponents: [UploadBottomSheetComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
