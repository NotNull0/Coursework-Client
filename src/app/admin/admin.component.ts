import {Component, OnInit} from '@angular/core';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';
import {UserDetailsService} from '../@service/user-details.service';
import {User} from '../@service/model/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              style({
                opacity: 1, transform: 'translateY(-100vh)'
              }),
              animate(
                '1s',
                style({opacity: 1, transform: 'translateY(0) rotate(0)'})
              ),
              animateChild()
            ],
            {optional: true}
          ),
          query(
            ':leave',
            [style({
              opacity: 1,
              transform: 'translateY(0)'
            }), animate('1s', style({opacity: 1, transform: 'translateY(100vh)'})), animateChild()],
            {optional: true}
          )
        ])
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  user: User;

  constructor(private _userDetailsService: UserDetailsService) {
    this.user = _userDetailsService.getUser();
    _userDetailsService.user$.subscribe(value => {
      this.user = _userDetailsService.getUser();
    });
  }

  getPage(outlet) {
    return outlet.activatedRouteData['state'] || 'account';
  }

  ngOnInit() {
  }

}
