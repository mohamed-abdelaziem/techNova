import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/Services/flowbite-service.service';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AuthService } from './core/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('techNova');
  private flowBiteService = inject(FlowbiteService);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private platFormId = inject(PLATFORM_ID);

  constructor(){
    if(isPlatformBrowser(this.platFormId)){
      this.authService.userRole.set(this.cookieService.get('userRole')!);
      console.log(this.authService.userRole())
    }
  }



  ngOnInit(): void {
    this.flowBiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
