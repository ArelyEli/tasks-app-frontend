import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: '',
    email: '',
    password: ''
  });

  loading = signal(false);
  error = signal('');
  success = signal(false);

  async onSubmit() {
    this.loading.set(true);
    this.error.set('');
    this.success.set(false);
    const { name, email, password } = this.form.getRawValue();

    try {
      await this.auth.signup(name, email, password);
      this.success.set(true);
      localStorage.setItem('pending_email', email);
      this.router.navigate(['/verify-account']);
    } catch (err: any) {
      this.error.set(err.message || 'Error al crear la cuenta');
    } finally {
      this.loading.set(false);
    }
  }
}
