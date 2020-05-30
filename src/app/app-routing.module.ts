import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './home/dashboard/dashboard.component';
import {UserAccountComponent} from './home/user-account/user-account.component';
import {AdminComponent} from './admin/admin.component';
import {AdminAccountComponent} from './admin/admin-account/admin-account.component';
import {AdminProjectComponent} from './admin/admin-project/admin-project.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/home/user', pathMatch: 'full'
  },
  {
    path: 'sign-in', component: SignInComponent,
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'dashboard/:id', component: DashboardComponent
      },
      {
        path: 'user', component: UserAccountComponent
      }
    ]
  }, {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: 'account', component: AdminAccountComponent, data: {state: 'account', number: '1'}
      },
      {
        path: 'project', component: AdminProjectComponent, data: {state: 'project', number: '2'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
