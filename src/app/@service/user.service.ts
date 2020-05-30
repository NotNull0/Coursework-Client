import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Task} from '../@model/task';
import {catchError, map} from 'rxjs/operators';
import {UserFindDto} from './model/user.find.dto';
import {UserRegistrationDto} from '../@model/dto/user.registration.dto';

@Injectable({providedIn: 'root'})
export class UserService {
  private controller = 'http://localhost:8080/user';

  constructor(private _httpClient: HttpClient) {
  }

  getUserList(): Observable<UserFindDto[]> {
    return this._httpClient.get<UserFindDto[]>(this.controller + `/find-all`)
      .pipe(catchError(err => throwError(err)));
  }

  findOne(idUser: number): Observable<UserFindDto> {
    let param: HttpParams = new HttpParams();
    param = param.set('idUser', String(idUser));
    return this._httpClient.get<UserFindDto>(this.controller + `/find-one`, {params: param})
      .pipe(catchError(err => throwError(err)));
  }

  findByPrincipal(): Observable<UserFindDto> {
    return this._httpClient.get<UserFindDto>(this.controller + `/find-by-principal`)
      .pipe(catchError(err => throwError(err)));
  }

  registration(userRegistrationDto: UserRegistrationDto): Observable<number> {
    return this._httpClient.post<number>(this.controller + `/registration`, JSON.stringify(userRegistrationDto))
      .pipe(catchError(err => throwError(err)));
  }

}
