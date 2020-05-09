import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GlobalImportModule} from "./shared/global-import.module";
import {UserDetailsService} from "./shared/service/user-details.service";
import {UrlInterceptor} from "./shared/service/interceptor/url.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthorizationInterceptor} from "./shared/service/interceptor/authorization.interceptor";
import {AuthenticationInterceptor} from "./shared/service/interceptor/authentication.interceptor";
import {RefreshInterceptor} from "./shared/service/interceptor/refresh.interceptor";

@NgModule({
  declarations: [
    AppComponent
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
export class AppModule { }
