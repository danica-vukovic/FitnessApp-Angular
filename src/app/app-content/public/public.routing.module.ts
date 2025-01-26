import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from '../main/main.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramListComponent } from '../shared/program-list/program-list.component'; 
import { ProgramDetailsComponent } from './program-details/program-details.component';

const routes: Routes = [
  
    { path: 'home', component: HomeComponent },
    { path: 'programs', component: ProgramsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
