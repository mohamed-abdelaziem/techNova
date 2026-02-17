import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../auth/auth.service";

export const  authenticationGuard: CanActivateFn = async () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  

  const role = await cookieService.get('userRole');

  if(!isPlatformBrowser(platformId)){
    return true;
  }



  if((role?.toLowerCase() == 'admin' && isPlatformBrowser(platformId)) || (authService.userRole() == 'admin' && isPlatformBrowser(platformId)) ) {
  return true;
  }else{
    return router.createUrlTree(['/home'])
  }


  
 

  





  
};
