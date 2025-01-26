import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DailyExercisesComponent } from './daily-exercises/daily-exercises.component';
import { AuthGuard } from '../../guards/auth.guard';
import { AddProgramComponent } from './add-program/add-program.component';
import { MyProgramsComponent } from './my-programs/my-programs.component';
import { PurchasedProgramsComponent } from './purchased-programs/purchased-programs.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { MessageListComponent } from './message-list/message-list.component';
import { SubscribeCategoryComponent } from './subscribe-category/subscribe-category.component';

const routes: Routes = [

  { path: 'profile',component: ProfileComponent},
  { path: 'daily-exercises', component: DailyExercisesComponent},
  { path: 'add-program', component: AddProgramComponent},
  { path: 'my-programs', component: MyProgramsComponent},
  { path: 'purchased-programs', component: PurchasedProgramsComponent},
  { path: 'activity-log', component: ActivityLogComponent},
  { path: 'message-list', component: MessageListComponent},
  { path: 'subscribe-category', component: SubscribeCategoryComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule {}