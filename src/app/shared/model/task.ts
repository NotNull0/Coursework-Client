import {TypeTask} from './enums';

export class Task {
  id: number;
  typeTask: TypeTask;
  name: string;
  idCreator: number;
  assignedToUser: number;
}
