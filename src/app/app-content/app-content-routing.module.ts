import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'public',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
      },
      {
        path: 'protected',
        loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
        canActivate: [AuthGuard] 
      },
      {
        path: '**', 
        redirectTo: 'public/home', 
        pathMatch: 'full'
      }
    ],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppContentRoutingModule {}