import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { CookieService } from 'ngx-cookie-service';
import { Supervisor } from 'src/app/models/Supervisor';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  public getData(): Observable<any> {
    console.log(this.cookieService.get('JWT-TOKEN'));
    var httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.get('JWT-TOKEN')}`,
      })
    };
    return this.http.get('http://localhost:1010/user/greet', {
      headers: httpOptions.headers,
      withCredentials: true,
      responseType: 'text'
    });
  }

  public getToken(data: any): Observable<any> {
    return this.http.post('http://localhost:1010/user/login'
      , data, {
        responseType: 'text'
      });
  }

  public registerUser(data: User): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:1010/user/register', data);
  }

  public identifyEmail(data: Supervisor): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:1010/user/forget-password',
      data);
  }

  public identifyCode(data: any): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:1010/user/identify-code',
      data);
  }

  public changePassword(password: string, identifyCode: string): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:1010/user/change-password', { password, identifyCode });
  }
}
