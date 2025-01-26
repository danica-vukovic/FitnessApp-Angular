import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.css'
})
export class AccountActivationComponent {

  message: string = '';
  isActivated: boolean = false;
  token: string | null = null;

  constructor(private route: ActivatedRoute, private signUpService: SignUpService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.message = "Invalid or missing token.";
      }
    });
  }

  onActivate(): void {
    if (this.token) {
      this.signUpService.activateAccount(this.token).subscribe({
        next: () => {
          this.message = "Account successfully activated. Redirecting...";
          this.isActivated = true;
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 4000);
        },
        error: (error) => {
          this.isActivated = true;
          this.message = "Invalid or expired token. Try register again.";
        }
      });
    }
  }
}
