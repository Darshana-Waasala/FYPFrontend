import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  messages: string[] = [];
  private url = './assets/location.json';

  constructor(
    private http: HttpClient,
  ) { }

 
  /**get the json file items */
  public getURL(){
    return this.http.get(this.url);
  }


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
