import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstruindoRoutingModule } from './construindo-routing.module';
import { ConstruindoComponent } from './construindo.component';


@NgModule({
  declarations: [
    ConstruindoComponent
  ],
  imports: [
    CommonModule,
    ConstruindoRoutingModule
  ]
})
export class ConstruindoModule { }
