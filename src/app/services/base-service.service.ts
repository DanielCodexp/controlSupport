import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  public get(API_URL: string, params?: HttpParams): Observable<any> {
    return this.http.get(API_URL, { params }) as Observable<any>;
  }


}
