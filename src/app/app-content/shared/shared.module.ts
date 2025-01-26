import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramListComponent } from './program-list/program-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material/app-material.module';

@NgModule({
  declarations: [ProgramListComponent],
  imports: [CommonModule,
    AppMaterialModule
  ],
  exports: [ProgramListComponent]
})
export class SharedModule { }