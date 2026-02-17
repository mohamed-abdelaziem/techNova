import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { CookieService } from "ngx-cookie-service";
import { IRegisterFormType } from './../types/interfaces';
import { log } from "console";
import { userInfo } from "os";
import { Router } from "@angular/router";

@Injectable({
providedIn : "root"
})


export class AuthService {
private httpClient = inject(HttpClient);
private cookieService = inject(CookieService);
private router = inject(Router);
isLogin = signal<boolean>(false);
userRole = signal<string>('student');
 

 

  constructor() {
  const userId = !!this.cookieService.get('userId');
    
    if (userId) {
      this.isLogin.set(true);
    } else {
      this.isLogin.set(false);
    }
  }

  logOut() {
    this.cookieService.delete('userId');
    this.cookieService.delete('userInfo');
    this.cookieService.delete('userRole');
    this.isLogin.set(false);
    this.userRole.set('');
    this.router.navigateByUrl('/login');
  }

register(registerValues : IRegisterFormType):Observable<any>{
return this.httpClient.post<any>(`/api/ProjectCompetition/register` , registerValues , {headers : {
"content-type" : 'application/json'
}});
};


login(loginForm : {email : string , password : string}){
return this.httpClient.post(`/api/ProjectCompetition/login` , loginForm);
}



}