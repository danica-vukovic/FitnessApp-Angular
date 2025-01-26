import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth/auth.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
     children: [
     { path: 'sign-up', component: SignUpComponent },
     { path: 'activate', component: AccountActivationComponent },
     { path: 'login', component: LoginComponent }
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
