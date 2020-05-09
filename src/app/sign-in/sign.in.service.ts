import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SignInService {
  private controller = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {
  }

  getUserToken(login: string, password: string): Observable<any> {
    let param: HttpParams = new HttpParams()
      .set('username', login)
      .set('password', password)
      .set('grant_type', 'password');
    return this._httpClient.post<any>(this.controller + '/oauth/token', null, {params: param})
      .pipe(catchError(err => throwError(err)));
  }
}
