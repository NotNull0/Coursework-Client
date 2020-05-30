import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GlobalImportModule} from './@config/global-import.module';
import {UserDetailsService} from './@service/user-details.service';
import {UrlInterceptor} from './@service/interceptor/url.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptor} from './@service/interceptor/authorization.interceptor';
import {AuthenticationInterceptor} from './@service/interceptor/authentication.interceptor';
import {RefreshInterceptor} from './@service/interceptor/refresh.interceptor';
import {SignInComponent} from './sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {UserAccountComponent} from './home/user-account/user-account.component';
import {DashboardComponent} from './home/dashboard/dashboard.component';
import {ProjectOneComponent} from './home/user-account/project-one/project-one.component';
import {ProjectStatusOneComponent} from './home/user-account/project-status-one/project-status-one.component';
import {CreateTaskDialogComponent} from './@dialog/create-task-dialog/create-task-dialog.component';
import {OpenTaskDialogComponent} from './@dialog/open-task-dialog/open-task-dialog.component';
import {AdminComponent} from './admin/admin.component';
import {AdminAccountComponent} from './admin/admin-account/admin-account.component';
import {AdminProjectComponent} from './admin/admin-project/admin-project.component';
import {UserService} from './@service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    UserAccountComponent,
    DashboardComponent,
    ProjectOneComponent,
    ProjectStatusOneComponent,
    CreateTaskDialogComponent,
    OpenTaskDialogComponent,
    AdminComponent,
    AdminAccountComponent,
    AdminProjectComponent,
  ],
  entryComponents: [
    CreateTaskDialogComponent,
    OpenTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GlobalImportModule
  ],
  providers: [
    UserDetailsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _userService: UserService, private _userDetailsService: UserDetailsService) {
    if (this._userDetailsService.checkAuth()) {
      this._userService.findByPrincipal().subscribe(value => {
        this._userDetailsService.login(value);
      }, error => {
        console.error(error);
      });
    }
  }
}
