import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TypeTask} from '../../@model/enums';
import {Status} from '../../@service/model/status';
import {CreateTaskData} from './create.task.data';
import {TaskService} from '../../@service/task.service';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {
  createTaskFG: FormGroup;
  public typeTask: TypeTask[] = [
    'BUG_FIX', 'NEW_FUNCTIONAL'
  ];
  newTask: any;

  constructor(private _formBuilder: FormBuilder,
              private _taskService:TaskService,
              public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CreateTaskData) {
  }

  ngOnInit() {
    this.createTaskFG = this._formBuilder.group({
      idStatus: [null, Validators.required],
      typeTask: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      projectId: [this.data.projectId, Validators.required]
    });
    this.newTask = this.createTaskFG.valueChanges.subscribe(value => {
      console.log(value);
      this.newTask = value;
    }, error => {
      console.log(error);
    });
  }


  onNoClick(): void {
    this._taskService.createNewTaskByStatusProject(this.newTask).subscribe(value => {
      console.log(value);
      this.dialogRef.close(true);
    },error => {
      console.log(error);
      this.dialogRef.close(false);
    });
  }
}
