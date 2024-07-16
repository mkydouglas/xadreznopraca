import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelogioRoutingModule } from './relogio-routing.module';
import { RelogioComponent } from './relogio.component';


@NgModule({
  declarations: [
    RelogioComponent
  ],
  imports: [
    CommonModule,
    RelogioRoutingModule
  ]
})
export class RelogioModule { }
