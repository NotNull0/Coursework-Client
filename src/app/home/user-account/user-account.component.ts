import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/service/project.service';
import {Page} from '../../shared/model/page';
import {Project} from '../../shared/model/project';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  showFiller = false;
  projects: Page<Project>;

  constructor(private _projectService: ProjectService) {
    this.getProject(0, 10);
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
}
