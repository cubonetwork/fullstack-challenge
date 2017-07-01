import { EmployeesComponent } from './employees.component';
import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from "@angular/core/core";


const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);