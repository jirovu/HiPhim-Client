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

  public login(data: any): Observable<any> {
    return this.http.post('http://localhost:1010/auth/login'
      , data);
  }

  public registerUser(data: User): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:1010/auth/register', data);
  }

  public identifyEmail(data: Supervisor): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:1010/auth/forget-password',
      data);
  }

  public identifyCode(data: any): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:1010/auth/identify-code',
      data);
  }

  public changePassword(password: string, identifyCode: string): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:1010/auth/change-password', { password, identifyCode });
  }

  public getAllMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>('http://localhost:1010/home/get-all-movies');
  }

  public getMovie(url: string): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:1010/home/personal${url}`);
  }

  public logout(): Observable<any> {
    return this.http.post('http://localhost:1010/auth/logout', {}, {
      withCredentials: true
    });
  }

  public getMoviesByCategory(category: string): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>('http://localhost:1010/home/get-movies-by-category', {
      params: {
        category: category
      }
    });
  }

  public getAns(ask: string): Observable<string> {
    return this.http.post('http://localhost:1010/home/get-ans', ask, {
      responseType: 'text'
    });
  }

  public getMoviesByCategoryAndName(movie: Movie): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>('http://localhost:1010/home/get-movies-by-category-and-name', {
      params: {
        name: movie.name,
        category: movie.category
      }
    });
  }

  public getMoviesByName(movie: Movie): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>('http://localhost:1010/home/get-movies-by-name', {
      params: {
        name: movie.name
      }
    })
  }

  public uploadFile(movie: Movie, file: File): Observable<boolean> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('description', movie.description);
    formData.append('category', movie.category);
    return this.http.post<boolean>('http://localhost:1010/user/uploadFile', formData);
  }

  public getAllMoviesByUserId(url: string): Observable<Array<Movie>>{
    return this.http.get<Array<Movie>>(`http://localhost:1010/home/watch${url}`,{
    });
  }
}
