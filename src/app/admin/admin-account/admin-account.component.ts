import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@service/user.service';
import {UserFindDto} from '../../@service/model/user.find.dto';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {
  showFiller = false;
  displayedColumns: string[] = [
    'name',
    'lastName',
    'surName',
    'phone',
    'email',
    'userType',
    'available',
    'actions',
  ];

  dataSource: UserFindDto[] = [];

  constructor(private _userService: UserService) {
    this._userService.getUserList().subscribe(value => {
      console.log(value);
      this.dataSource = value;
    }, error => {
      console.error(error);
    });
  }

  delete(o) {

  }
  changeLock(o){
  o.available=!o.available;
  }

  edit(o) {

  }

  ngOnInit() {
  }

}
