import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Eğer token varsa, erişime izin ver
  } else {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false; // Token yoksa, giriş sayfasına yönlendir
  }
};
