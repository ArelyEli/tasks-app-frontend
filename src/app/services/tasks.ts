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
        next: (data) => {
          const sorted = [...data].sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          this.tasks.set(sorted);
        },
        error: () => this.error.set('Error cargando tareas'),
        complete: () => this.loading.set(false)
      });
  }

  deleteTask(id: string) {
    this.loading.set(true);
    this.error.set('');

    const token = localStorage.getItem('id_token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http.delete(`https://jq2t0u9akl.execute-api.us-east-1.amazonaws.com/Prod/tasks/${id}`, { headers })
      .subscribe({
        next: () => this.loadTasks(),
        error: () => this.error.set('Error eliminando tarea'),
        complete: () => this.loading.set(false)
      });
  }
}
