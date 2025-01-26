import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpRequest } from '../../models/sign-up-request';
import { SignUpService } from '../services/sign-up.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from '../../app-content/services/image.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] 
})
export class SignUpComponent {
  signUpForm: FormGroup;
  avatarUrl: string | ArrayBuffer | null = 'assets/default-avatar.png';
  hidePassword = true;
  isLoading = false;

  constructor(private fb: FormBuilder, private signUpService: SignUpService, private snackBar: MatSnackBar, private imageService: ImageService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      avatar: ['']
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result;
        this.signUpForm.patchValue({ avatar: file });
      };
      reader.readAsDataURL(file);
    }
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      const file = this.signUpForm.get('avatar')?.value;
      this.isLoading = true;
      if (file) {
        this.imageService.uploadFile(file).subscribe({
          next: (url) => {
            this.submitSignUpForm(url);
          },
          error: (error) => { 
            this.snackBar.open(`Error uploading avatar: ${error.message}`, 'Close', {
              duration: 5000,
            });
            this.isLoading = false;
          }
        });
      } else {
        this.submitSignUpForm('assets/default-avatar.png');
      }
    }
  }

  private submitSignUpForm(avatarUrl: string): void {
    const signUpData: SignUpRequest = {
      name: this.signUpForm.get('name')?.value,
      surname: this.signUpForm.get('surname')?.value,
      username: this.signUpForm.get('username')?.value,
      password: this.signUpForm.get('password')?.value,
      email: this.signUpForm.get('email')?.value,
      city: this.signUpForm.get('city')?.value,
      avatar: avatarUrl
    };

    this.signUpService.signUp(signUpData).subscribe({
      next: (response) => {
        this.snackBar.open(response, 'Close', {
          duration: 5000,
        });
        this.isLoading = false;
        this.signUpForm.reset();
        this.avatarUrl = 'assets/default-avatar.png'; 
      },
      error: (error) => {
        this.snackBar.open(`Error: ${error.error}`, 'Close', {
          duration: 5000,
        });
        this.isLoading = false;
      }
    });
  }
}
