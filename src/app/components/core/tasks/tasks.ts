import { Component, OnInit, inject } from '@angular/core';
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
  tasks = this.tasksService.tasks;
  loading = this.tasksService.loading;
  error = this.tasksService.error;

  ngOnInit() {
    this.tasksService.loadTasks();
  }
}
