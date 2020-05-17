import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { UserCredentials } from './userCredentials';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class UserService {

  private url = 'http://localhost:8080';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
  authenticate(userCredentials: UserCredentials): Observable<UserCredentials> {
    const url = `${this.url}/authenticate`;
    return this.http.post<UserCredentials>(url, userCredentials, this.httpOptions).pipe(
      catchError(this.handleError<UserCredentials>('authentication'))
    );
  }
/*
  addItem(item: Item): Observable<Item> {
    const url = `${this.url}/item`; ///${item.id}
    return this.http.post<Item>(this.url, item, this.httpOptions).pipe(
      tap((newItem:Item) => console.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  updateItem(item: Item): Observable<any> {
    const url = `${this.url}/item`; ///${item.id}
    return this.http.put(url, item, this.httpOptions).pipe(
      tap(_ => console.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }
  */
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