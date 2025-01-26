import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { PublicRoutingModule } from './public.routing.module';
import { HomeComponent } from './home/home.component';
import { ProtectedModule } from '../protected/protected.module';
import { ProgramsComponent } from './programs/programs.component';
import { SharedModule } from '../shared/shared.module';
import { AttributeDialogComponent } from './attribute-dialog/attribute-dialog.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProgramsComponent,
    AttributeDialogComponent,
    PaymentDialogComponent,
    SearchComponent,
    FilterComponent,
    CommentsComponent
  ],

  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ProtectedModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicModule {}
