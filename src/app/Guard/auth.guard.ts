import { CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platform = inject(PLATFORM_ID);  // PLATFORM_ID'yi inject ettik.

  // Tarayıcıda olduğumuzu kontrol ediyoruz
  if (isPlatformBrowser(platform)) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Token'ı decode ediyoruz
        const expiration = decodedToken.exp * 1000; // Token expiration zamanını alıyoruz
        
        const currentTime = Date.now(); // Şu anki zamanı alıyoruz
        

        if (expiration < currentTime) {
          localStorage.removeItem('token'); // Token süresi dolmuşsa kaldır
          router.navigate(['/login']);
          return false; // Token expired
        }
        return true; // Token geçerli
      } catch (error) {
        localStorage.removeItem('token'); // Token invalidse kaldır
        router.navigate(['/login']);
        return false; // Geçersiz token
      }
    } else {
      router.navigate(['/login']);
      return false; // Token yoksa login sayfasına yönlendir
    }
  } else {
    // Eğer platform tarayıcı değilse (SSR ya da başka bir platformsa), işlem yapılmaz.
    return true;
  }
};
