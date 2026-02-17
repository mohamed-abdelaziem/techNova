import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { json } from 'express';
@Component({
  selector: 'app-login',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
isLoading = signal<boolean>(false);
private authService = inject(AuthService);
cookieService = inject(CookieService);
private router = inject(Router);
private toast = inject(ToastrService);
loginForm : FormGroup = new FormGroup({
email : new FormControl('' , [Validators.email]),
password : new FormControl('' , [Validators.minLength(3)])
});


onLogin(){
this.isLoading.set(true);
this.authService.login(this.loginForm.value).subscribe({
next : (res:any)=>{
this.toast.success('Login Successfully');
this.isLoading.set(false);
const myUserToken = 'mySecretKey___'+Math.floor(Math.random() * 10);
this.cookieService.set('userToken' , myUserToken);
const existUserToken = res?.userId;
this.cookieService.set('userId' , existUserToken);
this.cookieService.set('userRole' , res?.role);
this.cookieService.set('userInfo' , JSON.stringify(res));
this.authService.userRole.set(res?.role);
this.authService.isLogin.set(true);
this.router.navigate(['/home']);
},
error : (err)=>{
this.toast.error(err?.error);
this.isLoading.set(false);
}
})
}


}
