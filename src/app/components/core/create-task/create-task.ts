import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
  title = '';
  description = '';
  completed = false;

  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  createTask() {
    this.loading.set(true);
    this.error.set(null);

    const token = localStorage.getItem('id_token'); // <- Asegúrate de guardar el ID token, no access token

    this.http
      .post(
        'https://jq2t0u9akl.execute-api.us-east-1.amazonaws.com/Prod/tasks/',
        {
          title: this.title,
          description: this.description,
          completed: this.completed,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || '',
          },
        }
      )
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set('Error al crear la tarea');
          console.error(err);
        },
      });
  }
}
