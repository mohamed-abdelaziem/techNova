import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { IRegisterFormType } from '../../types/interfaces';


@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);

  private toast = inject(ToastrService);

  isloading = signal<boolean>(false);

  registerForm: IRegisterFormType = {
    collageName: '',
    fullName: '',
    email: '',
    role: 'student',
    password: '',
  };


onRegister() {
  this.isloading.set(true);

  this.authService
    .register(this.registerForm)
    .pipe(finalize(() => (this.isloading.set(false))))
    .subscribe({
      next: (res) => {
        this.toast.success(res?.message);
      },
      error: (err) => this.toast.error(err?.error),
    });

  }
}
