import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInService} from '../shared/service/sign.in.service';
import {UserDetailsService} from '../shared/service/user-details.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginFG: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _signInService: SignInService,
              private _userDetailsService: UserDetailsService,
              private _snackBar: MatSnackBar,
              private _router:Router) {
  }

  ngOnInit() {
    this.loginFG = this._formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  getUserToken() {
    event.preventDefault();
    this._signInService.getUserToken(this.loginFG.get('login').value, this.loginFG.get('password').value)
      .subscribe(value => {
        this._userDetailsService.tokenParseInLocalStorage(value);
        this._router.navigateByUrl("/");
      }, error => {
        console.log(error);
        this.info("Такого користувача немає в системі")
      });
  }

  info(message: string) {
    this._snackBar.open(message, 'ок', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      announcementMessage: message,
      politeness: 'polite',
      direction: 'ltr'
    });
  }
}
