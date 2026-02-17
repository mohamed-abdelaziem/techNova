import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { userInfo } from 'os';
import { FlowbiteService } from '../../Services/flowbite-service.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent  {
  cookieService = inject(CookieService);
  authService = inject(AuthService);
  platformId : any= inject(PLATFORM_ID);
  private flowbiteService = inject(FlowbiteService);

  constructor(){
    if(isPlatformBrowser(this.platformId)){
      this.authService.userRole.set(this.cookieService.get('userRole'));
    };
    
    this.flowbiteService.loadFlowbite((flowbite)=>{
      initFlowbite();
    })

  }
  
  

  
 


}
