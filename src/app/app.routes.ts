import { Routes } from '@angular/router';
import { Home } from './components/core/home/home';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { Tasks } from './components/core/tasks/tasks';
import { CreateTask } from './components/core/create-task/create-task';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'tasks', component: Tasks },
  { path: 'create-task', component: CreateTask },
  { path: 'edit-task/:id', component: CreateTask },
  { path: '**', redirectTo: '' }
];
