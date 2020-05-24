import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Task} from '../model/task';
import {catchError, map} from 'rxjs/operators';
import {UserFindDto} from './model/user.find.dto';

@Injectable({providedIn: 'root'})
export class UserService {
  private controller = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {
  }

  getUserList(): Observable<UserFindDto[]> {
    return this._httpClient.get<UserFindDto[]>(this.controller + `/find-all`)
      .pipe(catchError(err => throwError(err)));
  }

  findByPrincipal(): Observable<UserFindDto> {
    return this._httpClient.get<UserFindDto>(this.controller + `/find-by-principal`)
      .pipe(catchError(err => throwError(err)));
  }

}
