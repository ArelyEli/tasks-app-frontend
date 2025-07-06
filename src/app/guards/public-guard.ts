import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const publicGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  auth.checkSession();

  if (!auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/tasks']);
  return false;
};
