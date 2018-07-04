import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  messages: string[] = [];

  constructor(
    private http: HttpClient,
  ) { }


  /** POST a new item to the server */
  public postAnyReturn(url: string, item: any): Observable<any> { // the item will be of any format array or object 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.post<any>(url, item,httpOptions)
      .pipe(
        tap((itemRsp) => this.log(`posted item  = ${itemRsp}`)),
        catchError(this.handleError<any>(`post item ${item}`))
      )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messages.push('HeroService: ' + message);
  }
}
