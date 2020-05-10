import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TaskService} from '../../shared/service/task.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../shared/model/task';
import {Router} from '@angular/router';

@Component({
  selector: 'app-open-task-dialog',
  templateUrl: './open-task-dialog.component.html',
  styleUrls: ['./open-task-dialog.component.css']
})
export class OpenTaskDialogComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
              private _taskService: TaskService,
              public dialogRef: MatDialogRef<OpenTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(id: number): void {
    this._taskService.delete(id).subscribe(value => {
      this.dialogRef.close();
      console.log(value)
    },error => {
      console.log(error)
    })
  }
}
