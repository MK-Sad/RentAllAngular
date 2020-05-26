import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from './item';
import { MessageService } from './message.service';
import { ShareService } from './share.service';


@Injectable({ providedIn: 'root' })
export class ItemService {

  private url = this.shareService.homeUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private shareService: ShareService) { }


  getCategories(): Observable<string[]> {
    const url = `${this.url}/categories/pl`;
    return this.http.get<string[]>(url).pipe(
      tap(_ => console.log(`fetched categories`)),
      catchError(this.handleError<string[]>(`getCategories`))
    );
  }

  /** GET item by id. Return `undefined` when id not found */
  getItemNo404<Data>(id: number): Observable<Item> {
    const url = `${this.url}/id/${id}`;
    return this.http.get<Item[]>(url)
      .pipe(
        map(items => items[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} item id=${id}`);
        }),
        catchError(this.handleError<Item>(`getItem id=${id}`))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getItem(id: number): Observable<Item> {
    const url = `${this.url}/item/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => console.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  searchItemsByCategory(category: string): Observable<Item[]> {
    if (!category.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Item[]>(`${this.url}/item/category/${category}`).pipe(
      tap(x => x.length ?
         console.log(`found items matching "${category}"`) :
         console.log(`no items matching "${category}"`)),
      catchError(this.handleError<Item[]>('searchItemsByCategory', []))
    );
  }

  searchItemsByOwner(ownerName: string): Observable<Item[]> {
    if (!ownerName.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Item[]>(`${this.url}/item/owner/${ownerName}`).pipe(
      tap(x => x.length ?
         console.log(`found items matching "${ownerName}"`) :
         console.log(`no items matching "${ownerName}"`)),
      catchError(this.handleError<Item[]>('searchItemsByOwner', []))
    );
  }

  searchItemsByNamePart(namePart: string): Observable<Item[]> {
    if (!namePart.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Item[]>(`${this.url}/item/namePart/${namePart}`).pipe(
      tap(x => x.length ?
         console.log(`found items matching "${namePart}"`) :
         console.log(`no items matching "${namePart}"`)),
      catchError(this.handleError<Item[]>('searchItemsByNamePart', []))
    );
  }

  addItem(item: Item): Observable<Item> {
    const url = `${this.url}/item`;
    return this.http.post<Item>(url, item, this.httpOptions).pipe(
      tap((newItem:Item) => console.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  updateItem(item: Item): Observable<any> {
    const url = `${this.url}/item`; ///${item.id}
    return this.http.put(url, item, this.httpOptions).pipe(
      tap(_ => console.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }
  
  returnItem(itemId: number): Observable<any> {
    const url = `${this.url}/returnItem/${itemId}`;
    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => console.log(`returned item id=${itemId}`)),
      catchError(this.handleError<any>('returnItem'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Błąd: ${message}`);
  }
}