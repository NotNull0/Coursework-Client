import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/service/project.service';
import {Page} from '../../shared/model/page';
import {Project} from '../../shared/model/project';
import {Status} from '../../shared/service/model/status';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CreateTaskDialogComponent} from '../../dialogs/create-task-dialog/create-task-dialog.component';
import {CreateTaskData} from '../../dialogs/create-task-dialog/create.task.data';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  projects: Page<Project>;
  selectProject: number;
  selectProjectObject: Project;
  projectStatuses: Status[];
  connectedList: string[] = [];

  constructor(private _projectService: ProjectService,
              private _activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {
    this.getProject(0, 10);
    _activatedRoute.queryParams.subscribe(value => {
      this.selectProject = value['project_id'];
      this.init();
    });
  }

  ngOnInit() {
  }

  getProject(page: number, size: number) {
    this._projectService.getProjectList(page, size).subscribe(value => {
        this.projects = value;
        if (this.projects) {
          this.getCurrentProject();
        }
      }, error => {
        console.error(error);
      }
    );
  }

  init() {
    if (this.selectProject) {
      this._projectService.getProjectStatusList(this.selectProject).subscribe(value => {
        this.connectedList = [];
        this.projectStatuses = value;
        value.forEach(value1 => {
          this.connectedList.push(`status_drop_list_${value1.id}`);
        });
        if (this.projects) {
          this.getCurrentProject();
        }
      }, error => {
        console.log(error);
      });
    }
  }

  getCurrentProject() {
    if (this.projects) {
      this.selectProjectObject = this.projects.content.find(value => value.id == this.selectProject);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '350px',
      data: {
        status: this.projectStatuses,
        projectId: this.selectProject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.init()
      }else {

      }
      console.log('The dialog was closed');
    });
  }

}
