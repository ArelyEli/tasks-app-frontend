import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask implements OnInit {
  title = '';
  description = '';
  completed = false;

  loading = signal(false);
  error = signal<string | null>(null);
  id: string | null = null;

  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadTask(this.id);
    }
  }

  loadTask(id: string) {
    this.loading.set(true);
    const token = localStorage.getItem('id_token');
    const headers = new HttpHeaders().set('Authorization', token || '');

    this.http.get<any>(`https://jq2t0u9akl.execute-api.us-east-1.amazonaws.com/Prod/tasks/${id}`, { headers })
      .subscribe({
        next: (data) => {
          this.title = data.title;
          this.description = data.description;
          this.completed = data.completed;
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Error cargando la tarea');
          this.loading.set(false);
        }
      });
  }

  createTask() {
    this.loading.set(true);
    this.error.set(null);

    const token = localStorage.getItem('id_token');
    const headers = new HttpHeaders()
      .set('Authorization', token || '')
      .set('Content-Type', 'application/json');

    const body = {
      title: this.title,
      description: this.description,
      completed: this.completed,
    };

    const request$ = this.id
      ? this.http.put(`https://jq2t0u9akl.execute-api.us-east-1.amazonaws.com/Prod/tasks/${this.id}`, body, { headers })
      : this.http.post(`https://jq2t0u9akl.execute-api.us-east-1.amazonaws.com/Prod/tasks/`, body, { headers });

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Error al guardar la tarea');
        console.error(err);
      },
    });
  }
}
