import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private behaviorSubject = new BehaviorSubject<any>(null);
  data = this.behaviorSubject.asObservable();

  constructor() {
  }

  public shareEmail(email: string) {
    this.behaviorSubject.next(email);
  }
}
