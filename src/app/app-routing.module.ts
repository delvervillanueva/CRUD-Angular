import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ItemsComponent } from './components/items/items.component';

const routes: Routes = [

  {path: 'items', component: ItemsComponent},
  {path: 'agregar/:id', component: AgregarComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'items'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
