import {Component, Injectable, Input, OnInit} from '@angular/core';
import {Project} from '../../../@model/project';

@Component({
  selector: 'app-project-one',
  templateUrl: './project-one.component.html',
  styleUrls: ['./project-one.component.css']
})
export class ProjectOneComponent implements OnInit {
  @Input()
  project: Project;

  constructor() {

  }

  ngOnInit() {

  }

}
