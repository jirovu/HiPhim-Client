import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private emailBehaviorSubject = new BehaviorSubject<any>(null);
  email = this.emailBehaviorSubject.asObservable();

  constructor(private authService: AuthService) {
  }

  public shareEmail(email: string) {
    if (this.authService.isAuthenticated()) {
      this.emailBehaviorSubject.next(email);
    } else {
      this.emailBehaviorSubject.next(email);
    }
  }
}
