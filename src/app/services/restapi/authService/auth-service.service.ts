import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Supervisor } from 'src/app/models/Supervisor';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  public login(data: any): Promise<any> {
    return this.http.post('http://localhost:1010/auth/login'
      , data).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async registerUser(data: User): Promise<boolean> {
    return await this.http.post<boolean>('http://localhost:1010/auth/register', data).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async identifyEmail(data: Supervisor): Promise<boolean> {
    return await this.http.post<boolean>('http://localhost:1010/auth/forgetPassword',
      data).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async identifyCode(data: any): Promise<boolean> {
    return await this.http.post<boolean>('http://localhost:1010/auth/identifyCode',
      data).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async changePassword(password: string, identifyCode: string): Promise<boolean> {
    return await this.http.post<boolean>('http://localhost:1010/auth/changePassword', { password, identifyCode }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async logout(): Promise<any> {
    return await this.http.post('http://localhost:1010/auth/logout', {}, {
      withCredentials: true
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }
}
