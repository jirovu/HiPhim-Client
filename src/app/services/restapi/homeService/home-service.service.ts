import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/models/Movie';
import { User } from 'src/app/models/User';
import { Comment } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  constructor(private http: HttpClient) { }

  public async getAllMovies(): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/getAllMovies').toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getLimit8Movies(): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/getLimit8Movies').toPromise()
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

  public async getMoviesByCategory(category: string): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/getMoviesByCategory', {
      params: {
        category: category
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAns(ask: string): Promise<string> {
    return await this.http.post('http://localhost:1010/home/getAns', ask, {
      responseType: 'text'
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMoviesByCategoryAndName(movie: Movie): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/getMoviesByCategoryAndName', {
      params: {
        name: movie.name,
        category: movie.category
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMoviesByName(movie: Movie): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>('http://localhost:1010/home/getMoviesByName', {
      params: {
        name: movie.name
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAllMoviesByUserId(url: string): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`http://localhost:1010/home/watch${url}`, {
    }).toPromise()
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
