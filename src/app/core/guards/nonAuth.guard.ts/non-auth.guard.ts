import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const nonAuthenticatedMatchGuard: CanActivateFn = (route, segments) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  return !loginService.isAuthenticated() || router.createUrlTree(['/']);
};
