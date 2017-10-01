import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { DataTableComponent } from './data-table/data-table.component';

import { EmployeeService } from './employee.service';

@NgModule({
    declarations: [
        AppComponent,
        MainFormComponent,
        DataTableComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [
        EmployeeService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
