import { Component, OnInit, inject } from '@angular/core';
import { TasksService } from '../../../services/tasks';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  goToCreate() {
    this.router.navigate(['/create-task']);
  }

  editTask(id: string) {
    this.router.navigate(['/edit-task', id]);
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id);
  }
}
