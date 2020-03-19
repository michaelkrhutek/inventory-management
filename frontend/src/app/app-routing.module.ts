import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FinancialUnitsComponent } from './views/financial-units/financial-units.component';


const routes: Routes = [
  {
    path: 'financial-units',
    component: FinancialUnitsComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
