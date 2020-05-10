import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from '../../../shared/model/task';
import {Status} from '../../../shared/service/model/status';
import {TaskService} from '../../../shared/service/task.service';

@Component({
  selector: 'app-project-status-one',
  templateUrl: './project-status-one.component.html',
  styleUrls: ['./project-status-one.component.css']
})
export class ProjectStatusOneComponent implements OnInit {

  @Input() connectedList: string[] = [];
  @Input() status: Status;

  task: Task[] = [];
  taskToUpdate: Task;

  constructor(private _taskService: TaskService) {
  }

  ngOnInit() {
    this.getTasksFromStatus(this.status.id);
  }


  drop(event: CdkDragDrop<Task[]>) {
    console.log(event.previousContainer.data);
    console.log(this.taskToUpdate = event.previousContainer.data[event.previousIndex]);
    console.log(this.status);
    this.taskToUpdate.status.id = this.status.id;
    this.taskToUpdate.status.name = this.status.name;
    this.update(this.taskToUpdate);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getTasksFromStatus(idStatus: number) {
    this._taskService.getProjectStatusTaskList(idStatus).subscribe(value => {
      this.task = value;
    }, error => {
      console.log(error);
    });
  }

  update(task: Task) {
    this._taskService.update(task).subscribe(value => {
      console.log(value);
    }, error => {
      console.log(error);
    });
  }
}
