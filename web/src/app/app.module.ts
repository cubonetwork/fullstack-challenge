import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NvD3Module } from 'angular2-nvd3'
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { EmployeePieChartComponent } from './employees/employee-piechart/employee-piechart.component';
import { EmployeeService } from './employees/shared/employee.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeePieChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NvD3Module
  ],
  providers: [ EmployeeService ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
