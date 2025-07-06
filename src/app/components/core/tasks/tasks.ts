import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../../../services/tasks';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {
  private tasksService = inject(TasksService);
  private router = inject(Router);

  tasks = this.tasksService.tasks;
  loading = this.tasksService.loading;
  error = this.tasksService.error;

  ngOnInit() {
    this.tasksService.loadTasks();
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id);
  }

  editTask(id: string) {
    this.router.navigate(['/edit-task', id]);
  }
}
