import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Movie } from 'src/app/models/Movie';
import { Log } from 'src/app/models/Log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private urlServer:string = environment.urlServer;
  constructor(private http: HttpClient) { }

  public async getAllMovies(): Promise<Array<Movie>> {
    return this.http.get<Array<Movie>>(`${this.urlServer}/admin/getAllMovies`).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMovie(url: string): Promise<Movie> {
    return await this.http.get<Movie>(`${this.urlServer}/admin/personal${url}`).toPromise()
      .then(res => res)
      .catch(err => {
        throw err;
      });
  }

  public async getAllNotApprovedMovies(): Promise<Array<Movie>> {
    return this.http.get<Array<Movie>>(`${this.urlServer}/admin/getAllNotApprovedMovies`).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async editMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.put<Array<Movie>>(`${this.urlServer}/admin/editMovie`, movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async browseMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.put<Array<Movie>>(`${this.urlServer}/admin/browseMovie`, movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async deleteMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.post<Array<Movie>>(`${this.urlServer}/admin/deleteMovie`, movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async changePassForUser(user: User): Promise<boolean> {
    return await this.http.put<boolean>(`${this.urlServer}/admin/changePassword`, user).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAllLogs(): Promise<Array<Log>> {
    return await this.http.get<Array<Log>>(`${this.urlServer}/admin/getAllLogs`).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }
}
