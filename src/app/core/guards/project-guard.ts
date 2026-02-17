import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const projectGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if(!isPlatformBrowser(platformId)){
    return true;
  }

  if(authService.userRole().toLowerCase() == 'admin'){
    return router.createUrlTree(['/home']);
  }else{
    return true;
  }







};
