import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  public async uploadFile(movie: Movie, file: File): Promise<boolean> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('description', movie.description);
    formData.append('category', movie.category);
    return await this.http.post<boolean>('http://localhost:1010/user/uploadFile', formData).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async changePassForUser(user: User): Promise<boolean> {
    return await this.http.put<boolean>('http://localhost:1010/user/changePassword', user).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getALlMoviesByUser(): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/user/getAllMovies').toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async editMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.put<Array<Movie>>('http://localhost:1010/user/editMovie', movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async deleteMovie(movie: Movie): Promise<Array<Movie>> {
    return await this.http.post<Array<Movie>>('http://localhost:1010/user/deleteMovie', movie).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async addComment(comment: Comment, email: string): Promise<Array<Comment>> {
    let formData: FormData = new FormData();
    formData.append('movieId', comment.movieId);
    formData.append('content', comment.content);
    formData.append('email', email);
    return await this.http.post<Array<Comment>>('http://localhost:1010/user/addComment', formData).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }
}
