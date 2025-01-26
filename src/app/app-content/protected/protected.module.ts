import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { DailyExercisesComponent } from './daily-exercises/daily-exercises.component';
import { ProtectedRoutingModule } from './protected.routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { MyProgramsComponent } from './my-programs/my-programs.component';
import { SharedModule } from '../shared/shared.module';
import { PurchasedProgramsComponent } from './purchased-programs/purchased-programs.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { ActivityEntryComponent } from './activity-entry/activity-entry.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageChatComponent } from './message-chat/message-chat.component';
import { SubscribeCategoryComponent } from './subscribe-category/subscribe-category.component';


@NgModule({
  declarations: [
    ProfileComponent,
    DailyExercisesComponent,
    AddProgramComponent,
    MyProgramsComponent,
    PurchasedProgramsComponent,
    ActivityLogComponent,
    ActivityEntryComponent,
    MessageListComponent,
    MessageChatComponent,
    SubscribeCategoryComponent
  ],

  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule
  ],
  exports: [
    DailyExercisesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProtectedModule {}
