import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from 'src/app/models/Movie';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private emailBehaviorSubject = new BehaviorSubject<any>(null);
  email = this.emailBehaviorSubject.asObservable();

  constructor() {
  }

  public shareEmail(email: string) {
    this.emailBehaviorSubject.next(email);
  }
}
