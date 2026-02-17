import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

export const allCompetionGuard: CanActivateFn = (route, state) => {
 const cookieService = inject(CookieService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  // SSR: اسمح بالمرور
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const role = cookieService.get('userRole') || '';

  if (role.toLowerCase() == 'admin' || authService.userRole() == 'admin') {
    return router.createUrlTree(['/home']);
  }else{
    return true;
    
  }

};
