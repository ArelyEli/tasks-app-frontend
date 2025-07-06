import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: '',
    password: ''
  });

  loading = signal(false);
  error = signal('');
  verified = signal(false);

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      if (params.get('verified') === '1') {
        this.verified.set(true);
        setTimeout(() => this.verified.set(false), 3000);
      }
    });
  }

  async onSubmit() {
    this.loading.set(true);
    this.error.set('');
    const { email, password } = this.form.getRawValue();

    try {
      await this.auth.login(email, password);
      this.router.navigate(['/tasks']);
    } catch (err: any) {
      this.error.set(err.message || 'Error al iniciar sesión');
    } finally {
      this.loading.set(false);
    }
  }
}
