import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { UserCredentials } from './userCredentials';
import { MessageService } from './message.service';
import { UserPoints } from './userPoints';
import { User } from './user';
import { ShareService } from './share.service';


@Injectable({ providedIn: 'root' })
export class UserService {

  private url = this.shareService.homeUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private shareService: ShareService) { }

  authenticate(userCredentials: UserCredentials): Observable<UserPoints> {
    const url = `${this.url}/authenticate`;
    return this.http.post<UserPoints>(url, userCredentials, this.httpOptions).pipe(
      tap((userPoints:UserPoints) => console.log(`logged ${userPoints.name}, ${userPoints.points}`)),
      catchError(this.handleError<UserPoints>('authentication'))
    );
  }

  getUserPoints(userName: string): Observable<UserPoints> {
    const url = `${this.url}/points/${userName}`;
    return this.http.get<UserPoints>(url).pipe(
      tap(_ => console.log(`fetched userPoints ${userName}`)),
      catchError(this.handleError<UserPoints>(`getUserName=${userName}`))
    );
  }

  addUser(user: User): Observable<User> {
    const url = `${this.url}/user`;
    return this.http.post<User>(this.url, user, this.httpOptions).pipe(
      tap((newUser:User) => console.log(`added user name=${newUser.name}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.url}/user`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated user name=${user.name}`)),
      catchError(this.handleError<any>('updateIUser'))
    );
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      switch(error.error.status) {
        case 401: {
          this.log(`Niepoprawne dane logowania.`);
          break;
        }
        default: {
          this.log(`${operation} failed: ${error.message}`);
          break;
        }
    }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Błąd ${message}`);
  }
}
