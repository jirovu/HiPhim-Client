import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Supervisor } from 'src/app/models/Supervisor';
import { Movie } from 'src/app/models/Movie';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  public getData(): Observable<any> {
    return this.http.get('http://localhost:1010/user/greet', {
      responseType: 'text'
    });
  }

  public login(data: any): Observable<any> {
    return this.http.post('http://localhost:1010/user/login'
      , data);
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

  public getAllMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>('http://localhost:1010/home');
  }

  public getMovie(url: string): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:1010/home/personal${url}`);
  }

  public logout(): Observable<any> {
    var token = this.cookieService.get('JWT-TOKEN');
    return this.http.post('http://localhost:1010/user/logout', {}, {
      withCredentials: true
    });
  }
}
