import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  constructor(private http: HttpClient) { }

  public getData(token: string): Observable<any> {
    var httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    if (token) {
      httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        })
      };
    }
    return this.http.get('http://localhost:1010/user/greet', {
      headers: httpOptions.headers,
      withCredentials: true,
      responseType: 'text'
    });
  }

  public getToken(data: any): Observable<any> {
    return this.http.post('http://localhost:1010/user/login'
      , data, {
        responseType: 'text', withCredentials: true
      });
  }

  public registerUser(data: User): Observable<boolean> {

    return this.http.post<boolean>('http://localhost:1010/user/register', data);
  }
}
