import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Task} from '../model/task';
import {TaskDto} from '../model/dto/task.dto';

@Injectable({providedIn: 'root'})
export class TaskService {
  private controller = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {
  }

  getProjectStatusTaskList(statusId: number): Observable<Task[]> {
    let param: HttpParams = new HttpParams()
      .set('statusId', String(statusId));
    return this._httpClient.get<any>(this.controller + `/tasks/search/findAllByStatusProject`, {params: param})
      .pipe(map(value => value._embedded.tasks), catchError(err => throwError(err)));
  }

  update(task: Task): Observable<Task> {
    return this._httpClient.put<Task>(this.controller + `/tasks/${task.id}`, JSON.stringify(task))
      .pipe(catchError(err => throwError(err)));
  }

  createNewTaskByStatusProject(task: TaskDto): Observable<TaskDto> {
    return this._httpClient.post<TaskDto>(this.controller + `/task/create-new-task-by-status`, JSON.stringify(task))
      .pipe(catchError(err => throwError(err)));
  }


}
