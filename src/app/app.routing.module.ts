import {  RouterModule, Routes  } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProgramDetailsComponent } from './app-content/public/program-details/program-details.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./app-content/app-content.module').then((mod) => mod.AppContentModule),
  },
  
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'programs/program-details/:id', component: ProgramDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
