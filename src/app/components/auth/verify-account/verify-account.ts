import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-account.html',
  styleUrls: ['./verify-account.css']
})
export class VerifyAccount {

  ngOnInit() {
    const savedEmail = localStorage.getItem('pending_email');
    if (savedEmail) {
      this.form.controls['email'].setValue(savedEmail);
    }
  }
  
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: '',
    code: ''
  });

  loading = signal(false);
  error = signal('');
  success = signal(false);

  async onSubmit() {
    this.loading.set(true);
    this.error.set('');
    this.success.set(false);
    const { email, code } = this.form.getRawValue();

    try {
      await this.auth.confirmSignup(email, code);
      this.success.set(true);
      localStorage.removeItem('pending_email');
      this.router.navigate(['/login'], { queryParams: { verified: '1' } });
    } catch (err: any) {
      this.error.set(err.message || 'Error al verificar la cuenta');
    } finally {
      this.loading.set(false);
    }
  }
}
