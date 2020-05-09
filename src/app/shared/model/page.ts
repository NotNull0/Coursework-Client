import {Project} from './project';

export interface Page<T> {
  content: T[],
  last: boolean,
  totalPages: number,
  totalElements: number,
  first: boolean,
  numberOfElements: number,
  sort: string,
  size: number,
  number: number
}

export class PageImpl<T> implements Page<T> {
  content: T[] = [];
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  sort: string;
  size: number;
  number: number;

  parse(value: any, nameField: string) {

    this.content = value._embedded[nameField];
    this.totalElements = value.page.totalElements;
    this.totalPages = value.page.totalPages;
    this.number = value.page.number;

    this.first = this.number == 0;
    this.last = this.totalPages - 1 == this.number;
    return this;
  }
}
