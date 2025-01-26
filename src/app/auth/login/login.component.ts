import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { User } from '../../models/user';
import { Status } from '../../models/user';
import { LoginResponse } from '../../models/login-response'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router,private loginService: LoginService,private snackBar: MatSnackBar, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData: LoginRequest = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      }

      this.isLoading = true;
      this.loginService.login(loginData).subscribe({
        
        next: (response : LoginResponse) => {

          this.isLoading = false;
    
          this.authService.saveAccessToken(response.token);
          const currentUser: User = new User(
            response.idUser,
            response.name,
            response.surname,
            response.username,
            response.email,
            response.city,
            response.avatar,
            Status[response.status as keyof typeof Status] 
          );
  
          this.authService.saveUser(currentUser);
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/main']).then(() => {
          });
        },
        error: (errorResponse) => {
          if (errorResponse.status === 401) {
            this.snackBar.open('Invalid username or password.', 'Close', { duration: 3000 });
            this.isLoading = false;

          } else if (errorResponse.status === 403) {
            this.snackBar.open('Your account is inactive. Please check your email for activation.', 'Close', { duration: 5000 });
            this.isLoading = false;

          } else if (errorResponse.status === 500) {
            this.snackBar.open('Internal server error. Please try again later.', 'Close', { duration: 3000 });
            this.isLoading = false;

          } else {
            this.snackBar.open('An unexpected error occurred. Please try again.', 'Close', { duration: 3000 });
            this.isLoading = false;
          }
        }
      });
    }
   }

}
