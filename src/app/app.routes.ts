import { Routes } from '@angular/router';
import { Home } from './components/core/home/home';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { Tasks } from './components/core/tasks/tasks';
import { CreateTask } from './components/core/create-task/create-task';
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';
import { VerifyAccount } from './components/auth/verify-account/verify-account';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login, canActivate: [publicGuard] },
  { path: 'signup', component: Signup, canActivate: [publicGuard] },
  { path: 'tasks', component: Tasks, canActivate: [authGuard] },
  { path: 'create-task', component: CreateTask, canActivate: [authGuard] },
  { path: 'edit-task/:id', component: CreateTask, canActivate: [authGuard] },
  { path: 'verify-account', component: VerifyAccount, canActivate: [publicGuard] },
  { path: '**', redirectTo: '' }
];
