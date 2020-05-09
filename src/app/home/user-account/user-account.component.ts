import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/service/project.service';
import {Page} from '../../shared/model/page';
import {Project} from '../../shared/model/project';
import {Status} from '../../shared/service/model/status';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  projects: Page<Project>;
  selectProject: number;
  projectStatuses: Status[];

  constructor(private _projectService: ProjectService, private _activatedRoute: ActivatedRoute) {
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
      }, error => {
        console.error(error);
      }
    );
  }

  init() {
    if (this.selectProject) {
      this._projectService.getProjectStatusList(this.selectProject).subscribe(value => {
        this.projectStatuses = value;
      }, error => {
        console.log(error);
      });
    }
  }
}
