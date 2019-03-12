import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/models/Movie';
import { User } from 'src/app/models/User';
import { Comment } from 'src/app/models/Comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  private urlServer:string = environment.urlServer;
  constructor(private http: HttpClient) { }

  public async getAllMovies(): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`${this.urlServer}/home/getAllMovies`).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getLimit8Movies(): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`${this.urlServer}/home/getLimit8Movies`).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMovie(url: string): Promise<Movie> {
    return await this.http.get<Movie>(`${this.urlServer}/home/personal${url}`).toPromise()
      .then(res => res)
      .catch(err => {
        throw err;
      });
  }

  public async getMoviesByCategory(category: string): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`${this.urlServer}/home/getMoviesByCategory`, {
      params: {
        category: category
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAns(ask: string): Promise<string> {
    return await this.http.post(`${this.urlServer}/home/getAns`, ask, {
      responseType: `text`
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMoviesByCategoryAndName(movie: Movie): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`${this.urlServer}/home/getMoviesByCategoryAndName`, {
      params: {
        name: movie.name,
        category: movie.category
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getMoviesByName(movie: Movie): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`${this.urlServer}/home/getMoviesByName`, {
      params: {
        name: movie.name
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAllMoviesByUserId(url: string): Promise<Array<Movie>> {
    return await this.http.get<Array<Movie>>(`${this.urlServer}/home/watch${url}`, {
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getAllCommentsByMovieId(movieId: string): Promise<Array<Comment>> {
    return await this.http.get<Array<Comment>>(`${this.urlServer}/home/getAllComments`, {
      params: {
        movieId
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }

  public async getUserByUserId(userId: string): Promise<User> {
    return await this.http.get<User>(`${this.urlServer}/home/getUserByUserId`, {
      params: {
        userId
      }
    }).toPromise()
      .then(res => res)
      .catch(err => { throw err });
  }
}
