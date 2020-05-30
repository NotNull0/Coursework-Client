import {Component, OnInit} from '@angular/core';
import {UserFindDto} from '../../@service/model/user.find.dto';
import {ProjectService} from '../../@service/project.service';
import {Page} from '../../@model/page';
import {Project} from '../../@model/project';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'available',
    'actions',
  ];

  dataSource: Page<Project>;

  constructor(private _projectService: ProjectService) {
    this.load();
  }

  load() {
    this._projectService.getProjectList(0, 1000).subscribe(value => {
      this.dataSource = value;
    }, error => {
      console.error(error);
    });
  }

  changeLock(o) {
    o.available = !o.available;
  }

  delete(o) {

  }

  ngOnInit() {
  }

}
