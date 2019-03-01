import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Supervisor } from 'src/app/models/Supervisor';
import { Movie } from 'src/app/models/Movie';
import { CookieService } from 'ngx-cookie-service';
import { Comment } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

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
    return await this.http.post<boolean>('http://localhost:1010/auth/forget-password',
      data).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async identifyCode(data: any): Promise<boolean> {
    return await this.http.post<boolean>('http://localhost:1010/auth/identify-code',
      data).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async changePassword(password: string, identifyCode: string): Promise<boolean> {
    return await this.http.post<boolean>('http://localhost:1010/auth/change-password', { password, identifyCode }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAllMovies(): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/get-all-movies').toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMovie(url: string): Promise<Movie> {
    return await this.http.get<Movie>(`http://localhost:1010/home/personal${url}`).toPromise()
      .then(res => res)
      .catch(err => {
        throw err;
      });
  }

  public async logout(): Promise<any> {
    return await this.http.post('http://localhost:1010/auth/logout', {}, {
      withCredentials: true
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMoviesByCategory(category: string): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/get-movies-by-category', {
      params: {
        category: category
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAns(ask: string): Promise<string> {
    return await this.http.post('http://localhost:1010/home/get-ans', ask, {
      responseType: 'text'
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMoviesByCategoryAndName(movie: Movie): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/get-movies-by-category-and-name', {
      params: {
        name: movie.name,
        category: movie.category
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMoviesByName(movie: Movie): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/get-movies-by-name', {
      params: {
        name: movie.name
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async uploadFile(movie: Movie, file: File): Promise<boolean> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('description', movie.description);
    formData.append('category', movie.category);
    return await this.http.post<boolean>('http://localhost:1010/user/uploadFile', formData).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAllMoviesByUserId(url: string): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`http://localhost:1010/home/watch${url}`, {
    }).toPromise()
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

  public async getAllCommentsByMovieId(movieId: string): Promise<Array<Comment>> {
    return await this.http.get<Array<Comment>>('http://localhost:1010/home/getAllComments', {
      params: {
        movieId
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getUserByUserId(userId: string): Promise<User> {
    return await this.http.get<User>('http://localhost:1010/home/getUserByUserId', {
      params: {
        userId
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }
}
