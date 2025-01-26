import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AppContentRoutingModule} from './app-content-routing.module';
import { ProtectedModule } from './protected/protected.module';
import { PublicModule } from './public/public.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    MainComponent,
  ],

  imports: [
    CommonModule,
    AppContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ProtectedModule,
    PublicModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppContentModule {}