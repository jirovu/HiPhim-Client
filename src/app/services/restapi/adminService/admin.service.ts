import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Movie } from 'src/app/models/Movie';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  public async getAllMovies(): Promise<Array<Movie>> {
    return this.http.get<Array<Movie>>('http://localhost:1010/admin/getAllMovies').toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async editMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.put<Array<Movie>>('http://localhost:1010/admin/editMovie', movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async deleteMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.post<Array<Movie>>('http://localhost:1010/admin/deleteMovie', movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }
}
