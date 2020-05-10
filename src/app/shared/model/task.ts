import {TypeTask} from './enums';
import {Status} from '../service/model/status';
import {Project} from './project';

export class Task {
  id: number;
  typeTask: TypeTask;
  name: string;
  idCreator: number;
  assignedToUser: number;
  status: Status;
  project: Project;
}
