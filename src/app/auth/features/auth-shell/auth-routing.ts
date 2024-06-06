import { Routes } from '@angular/router';
import AuthLogInComponent from '../auth-log-in/auth-log-in.component';

const routes: Routes = [
  {
    path: 'log-in',
    component: AuthLogInComponent
  },
  {
    path: 'inicio',
    redirectTo: 'log-in'
  }
];

export default routes;
