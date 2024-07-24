import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstruindoComponent } from './construindo.component';

const routes: Routes = [{ path: '', component: ConstruindoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstruindoRoutingModule { }
