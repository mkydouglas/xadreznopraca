import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { 
    path: 'relogio', 
    loadChildren: () => import('./relogio/relogio.module').then(m => m.RelogioModule) 
  },
  { 
    path: 'construindo', 
    loadChildren: () => import('./construindo/construindo.module').then(m => m.ConstruindoModule) 
  },
  { 
    path: '**', 
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
