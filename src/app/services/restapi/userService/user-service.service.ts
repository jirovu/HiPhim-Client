import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/models/Comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private urlServer:string = environment.urlServer;

  constructor(private http: HttpClient) { }

  public async uploadFile(movie: Movie, file: File): Promise<boolean> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('description', movie.description);
    formData.append('category', movie.category);
    console.log(formData);
    return await this.http.post<boolean>(`${this.urlServer}/user/uploadFile`, formData).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async changePassForUser(user: User): Promise<boolean> {
    return await this.http.put<boolean>(`${this.urlServer}/user/changePassword`, user).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getALlMoviesByUser(): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`${this.urlServer}/user/getAllMoviesByUser`).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async editMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.put<Array<Movie>>(`${this.urlServer}/user/editMovie`, movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async deleteMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.post<Array<Movie>>(`${this.urlServer}/user/deleteMovie`, movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async addComment(comment: Comment, email: string): Promise<Array<Comment>> {
    let formData: FormData = new FormData();
    formData.append(`movieId`, comment.movieId);
    formData.append(`content`, comment.content);
    formData.append(`email`, email);
    return await this.http.post<Array<Comment>>(`${this.urlServer}/user/addComment`, formData).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }
}
