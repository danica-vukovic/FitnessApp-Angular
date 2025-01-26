import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { AuthService } from '../../../auth/services/auth.service';
import { ImageService } from '../../services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../../models/user-request';
import { PasswordRequest } from '../../../models/password-request';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 

  editProfileForm: FormGroup;
  passwordForm: FormGroup;
  avatarUrl: string | null = null; 
  originalAvatarUrl: string = ''; 
  isLoading: boolean = false;
  showPasswordChange: boolean = false;
  user: User | null = null;
  file: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,private formBuilder: FormBuilder,
       private imageService: ImageService,  private snackBar: MatSnackBar, private userService: UserService) {

    this.editProfileForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.user=this.authService.getUser();
    this.editProfileForm = this.formBuilder.group({
      name: [this.user?.name, Validators.required],
      surname: [this.user?.surname, Validators.required],
      email: [this.user?.email, Validators.required],
      city: [this.user?.city, Validators.required],
    });
    if (this.user?.avatar != "assets/default-avatar.png" && this.user?.avatar) {
      this.imageService.getImageUrl(this.user.avatar).subscribe((data) => {
        this.avatarUrl = data!;
        this.originalAvatarUrl=data!;
      });
    }else {
      this.avatarUrl=this.user?.avatar || '';
    }
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.isLoading = true;
      
      this.imageService.uploadFile(file).subscribe(
        (uploadedFilePath) => {
          this.imageService.getImageUrl(uploadedFilePath).subscribe(newAvatarUrl => {
            if (newAvatarUrl !== this.originalAvatarUrl) {
              this.avatarUrl = newAvatarUrl;
              this.user!.avatar = uploadedFilePath;
            }
            this.isLoading = false;
          });
        },
        (error) => {
          this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
          this.isLoading = false;
        }
      );
    }
  }
  
  updateProfile(): void {
    if (this.editProfileForm.valid) {

      const userRequest: UserRequest = {
        name: this.editProfileForm.get('name')?.value,          
        surname: this.editProfileForm.get('surname')?.value,    
        email: this.editProfileForm.get('email')?.value,     
        city: this.editProfileForm.get('city')?.value,        
        avatar: this.avatarUrl || ''   
      };
      const userId = this.user?.idUser ?? -1;
      this.userService.updateUser(userRequest, userId).subscribe({
        next: (data) => {
          this.authService.saveUser(data);
        },
        error: () =>
          this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
        complete: () => {
          this.snackBar.open('Account updated sucessfully!.', undefined, {
            duration: 4000,
          });
        },
      });
    }
  }
  
  submitPasswordChange(): void {
    if (this.passwordForm.valid) {
      let passwordRequest: PasswordRequest = {
        oldPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword,
      };

      const userId = this.user?.idUser ?? -1;
      this.userService.changePassword(passwordRequest, userId).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.snackBar.open(response, 'Close', {
            duration: 3000, 
          });
      },
      error: (error: any) => {
          this.isLoading = false;
          this.snackBar.open(error.error, 'Close', {
            duration: 3000,
          });
      }
    });
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmNewPassword = formGroup.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { mismatch: true };
  }
  

  togglePasswordChange(): void {
    this.showPasswordChange = !this.showPasswordChange;
  }
}

