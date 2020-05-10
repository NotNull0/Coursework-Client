import {TypeTask} from '../enums';

export class TaskDto {
  id: number;
  idStatus: number;
  projectId: number;
  typeTask: TypeTask;
  name: string;
  idCreator: number;
  assignedToUser: number;
}
