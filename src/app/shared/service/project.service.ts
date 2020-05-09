import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Page, PageImpl} from '../model/page';
import {Project} from '../model/project';

@Injectable({providedIn: 'root'})
export class ProjectService {
  private controller = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {
  }

  getProjectList(page: number, size: number): Observable<Page<Project>> {
    let param: HttpParams = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    return this._httpClient.get<any>(this.controller + '/projects', {params: param})
      .pipe(map(value => new PageImpl<Project>().parse(value, 'projects')), catchError(err => throwError(err)));
  }

}
