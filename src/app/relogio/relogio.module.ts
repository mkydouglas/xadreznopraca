import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelogioRoutingModule } from './relogio-routing.module';
import { RelogioComponent } from './relogio.component';
import { TempoDialogComponent } from './tempo-dialog/tempo-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmacaoDialogComponent } from './confirmacao-dialog/confirmacao-dialog.component';
import { SugestaoPlataformaDialogComponent } from './sugestao-plataforma-dialog/sugestao-plataforma-dialog.component';


@NgModule({
  declarations: [
    RelogioComponent,
    TempoDialogComponent,
    ConfirmacaoDialogComponent,
    SugestaoPlataformaDialogComponent
  ],
  imports: [
    CommonModule,
    RelogioRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class RelogioModule { }
