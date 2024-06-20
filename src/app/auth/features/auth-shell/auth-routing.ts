import { Routes } from '@angular/router';
import AuthLogInComponent from '../auth-log-in/auth-log-in.component';
import AuthSignUpComponent from '../auth-sign-up/auth-sign-up.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: AuthSignUpComponent
  },
  {
    path: 'log-in',
    component: AuthLogInComponent
  },
  {
    path: '**',
    redirectTo: 'log-in'
  }
];

export default routes;
