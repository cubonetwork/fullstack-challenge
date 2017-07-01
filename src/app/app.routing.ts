import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/**
 * Created this routing file in order to lazy load other modules in the project. This approach is much more flexible
 * and it enhances performance
 */
export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', redirectTo: '/employees'},
  { path: 'employees', loadChildren: './employees/employees.module#EmployeesModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);