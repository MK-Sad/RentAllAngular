import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Rental } from './rental';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class RentalService {

  private url = 'http://localhost:8080';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  searchRentalsByUserName(userName: string): Observable<Rental[]> {
    if (!userName.trim()) {
      return of([]);
    }
    return this.http.get<Rental[]>(`${this.url}/rentalsByUser/${userName}`).pipe(
      tap(x => x.length ?
         this.log(`found items matching "${userName}"`) :
         this.log(`no items matching "${userName}"`)),
      catchError(this.handleError<Rental[]>('searchRentalsByUserName', []))
    );
  }

  addRental(newRental: Rental): Observable<Rental> {
    return this.http.post<Rental>(`${this.url}/rentItem`, newRental, this.httpOptions).pipe(
      tap((newRental:Rental) => this.log(`added rental w/ id=${newRental.id}`)),
      catchError(this.handleError<Rental>('addRental'))
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
}