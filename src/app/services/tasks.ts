import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
};

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient);
  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal('');

  loadTasks() {
    this.loading.set(true);
    this.error.set('');

    const token = localStorage.getItem('id_token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http.get<Task[]>('https://jq2t0u9akl.execute-api.us-east-1.amazonaws.com/Prod/tasks/', { headers })
      .subscribe({
        next: (data) => this.tasks.set(data),
        error: (err) => this.error.set('Error cargando tareas'),
        complete: () => this.loading.set(false)
      });
  }
}
